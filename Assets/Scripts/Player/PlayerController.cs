using UnityEngine;

namespace KebabKingdom.Player
{
    /// <summary>
    /// Handles third-person movement: WASD walking, sprinting and jumping.
    /// Attach to the Player GameObject alongside a CharacterController component.
    /// </summary>
    [RequireComponent(typeof(CharacterController))]
    public class PlayerController : MonoBehaviour
    {
        [Header("Movement")]
        [SerializeField] private float walkSpeed = 4f;
        [SerializeField] private float sprintSpeed = 8f;
        [SerializeField] private float rotationSpeed = 12f;

        [Header("Jumping & Gravity")]
        [SerializeField] private float jumpHeight = 1.4f;
        [SerializeField] private float gravity = -20f;

        [Header("References")]
        [SerializeField] private Transform cameraTransform; // used to move relative to camera facing
        [SerializeField] private Animator animator; // optional, for basic animations

        private CharacterController controller;
        private Vector3 velocity;
        private bool isGrounded;

        private void Awake()
        {
            controller = GetComponent<CharacterController>();

            // Fall back to the main camera if none was assigned in the Inspector.
            if (cameraTransform == null && Camera.main != null)
            {
                cameraTransform = Camera.main.transform;
            }
        }

        private void Update()
        {
            HandleGroundCheck();
            HandleMovement();
            HandleJump();
            ApplyGravity();
        }

        private void HandleGroundCheck()
        {
            isGrounded = controller.isGrounded;

            // Keep a small downward force while grounded so isGrounded stays reliable.
            if (isGrounded && velocity.y < 0f)
            {
                velocity.y = -2f;
            }
        }

        private void HandleMovement()
        {
            float horizontal = Input.GetAxisRaw("Horizontal");
            float vertical = Input.GetAxisRaw("Vertical");
            Vector3 inputDirection = new Vector3(horizontal, 0f, vertical).normalized;

            bool isSprinting = Input.GetKey(KeyCode.LeftShift);
            float currentSpeed = isSprinting ? sprintSpeed : walkSpeed;

            if (inputDirection.magnitude >= 0.1f)
            {
                // Move relative to the camera so "forward" always means "away from camera".
                float targetAngle = Mathf.Atan2(inputDirection.x, inputDirection.z) * Mathf.Rad2Deg
                    + (cameraTransform != null ? cameraTransform.eulerAngles.y : 0f);

                Quaternion targetRotation = Quaternion.Euler(0f, targetAngle, 0f);
                transform.rotation = Quaternion.Slerp(transform.rotation, targetRotation, rotationSpeed * Time.deltaTime);

                Vector3 moveDirection = Quaternion.Euler(0f, targetAngle, 0f) * Vector3.forward;
                controller.Move(moveDirection.normalized * currentSpeed * Time.deltaTime);
            }

            if (animator != null)
            {
                float animationSpeed = inputDirection.magnitude * (isSprinting ? 1f : 0.5f);
                animator.SetFloat("Speed", animationSpeed);
            }
        }

        private void HandleJump()
        {
            if (isGrounded && Input.GetButtonDown("Jump"))
            {
                // v = sqrt(h * -2 * g) derived from the physics equation for jump height.
                velocity.y = Mathf.Sqrt(jumpHeight * -2f * gravity);
                animator?.SetTrigger("Jump");
            }
        }

        private void ApplyGravity()
        {
            velocity.y += gravity * Time.deltaTime;
            controller.Move(velocity * Time.deltaTime);
        }
    }
}
