import S3Service from "../services/S3Service";

export class Utils {

    static uploadPhotos = async (mediaUrls: string[]) => {
        const s3Links: string[] = [];
      
        for (const url of mediaUrls) {
          try {
            const uploadedUrl = await S3Service.uploadImage(url);
            s3Links.push(uploadedUrl);
          } catch (error) {
            console.error("Error uploading media:", error);
          }
        }
      
        return s3Links;
      };

    /* TRANSFORMA EM Base64 */
    static handleUpload(event: any): Promise<string | null> {
        return new Promise((resolve) => {
            const file = event.target.files[0];

            if (!file) {
                resolve(null);
                return;
            }

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload  = () => resolve(reader.result as string);
            reader.onerror = () => resolve(null);
        });
    }

};