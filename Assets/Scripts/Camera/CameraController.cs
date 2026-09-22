using UnityEngine;

namespace KebabKingdom.CameraSystem
{
    /// <summary>
    /// Simple third-person mouse-look camera. Orbits a pivot point around the player
    /// and keeps a fixed distance behind/above them, similar to Roblox-style cameras.
    /// Attach to the Main Camera GameObject.
    /// </summary>
    public class CameraController : MonoBehaviour
    {
        [Header("Target")]
        [SerializeField] private Transform target; // usually the Player transform

        [Header("Mouse Look")]
        [SerializeField] private float mouseSensitivity = 3f;
        [SerializeField] private float minPitch = -30f;
        [SerializeField] private float maxPitch = 60f;

        [Header("Distance")]
        [SerializeField] private Vector3 offset = new Vector3(0f, 2f, -4f);

        private float yaw;
        private float pitch;

        private void Start()
        {
            Cursor.lockState = CursorLockMode.Locked;
            Cursor.visible = false;

            yaw = target != null ? target.eulerAngles.y : 0f;
        }

        private void LateUpdate()
        {
            if (target == null)
            {
                return;
            }

            yaw += Input.GetAxis("Mouse X") * mouseSensitivity;
            pitch -= Input.GetAxis("Mouse Y") * mouseSensitivity;
            pitch = Mathf.Clamp(pitch, minPitch, maxPitch);

            Quaternion rotation = Quaternion.Euler(pitch, yaw, 0f);
            Vector3 desiredPosition = target.position + rotation * offset;

            transform.position = desiredPosition;
            transform.LookAt(target.position + Vector3.up * 1.5f);
        }
    }
}
