
import { supabase } from "./supabaseClient";

export default function uploadMedia(file) {
  return new Promise(async (resolve, reject) => {
    if (!file) {
      reject("No file selected");
      return;
    }

    try {
      const timestamp = new Date().getTime();
      const fileName = `${timestamp}-${file.name}`;

      const { data, error } = await supabase.storage
        .from("images")
        .upload(fileName, file, {
          upsert: false,
          cacheControl: "3600",
        });

      if (error) {
        reject("An error occurred while uploading the file: " + error.message);
        return;
      }

      const { data: publicData } = supabase.storage
        .from("images")
        .getPublicUrl(fileName);

      resolve(publicData.publicUrl);
    } catch (err) {
      reject("Unexpected error: " + err.message);
    }
  });
}
