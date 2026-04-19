import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with server-side credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Upload a base64-encoded image to Cloudinary.
 * Returns the secure URL and public_id.
 */
export async function uploadImageToCloudinary(
  base64Data: string,
  folder = 'solyn_advisory'
): Promise<{ url: string; publicId: string }> {
  const result = await cloudinary.uploader.upload(base64Data, {
    folder,
    resource_type: 'image',
    transformation: [
      { quality: 'auto:good' },
      { fetch_format: 'auto' },
    ],
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
  };
}

/**
 * Delete an image from Cloudinary by public_id.
 */
export async function deleteImageFromCloudinary(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId);
}
