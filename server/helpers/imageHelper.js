import Cloudinary from '../config/cloudinary';

/**
 * This class contains
 * methods handle
 * image-related operations
 */
class ImageHelper {
  /**
       * This method verifies node environment
       * and decides to upload images
       * when not in the test environment
       * @param {*} images Images to be uploaded
       * @returns {string} Image url
       */
  static async uploadImages(images) {
    if (process.env.NODE_ENV !== 'test') {
      const uploadedImages = await Cloudinary.uploadImagesOnline(images);
      return uploadedImages;
    }
    return images;
  }
}

export default ImageHelper;
