import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

export async function saveQRCodeImage(qrRef: any, cardName: string) {
  try {
    const permission = await MediaLibrary.requestPermissionsAsync();
    const sanitizedCardName = cardName;
    const tempFileUri =
      FileSystem.documentDirectory + `${sanitizedCardName}_QrCode.png`;
    const uri = await qrRef.capture();

    if (permission.granted === false) {
      console.log("Permissão negada para acessar a galeria.");
      return;
    }

    if (!uri) {
      console.error("Falha na captura. URI não recebida.");
      return;
    }

    await FileSystem.moveAsync({
      from: uri,
      to: tempFileUri,
    });

    const asset = await MediaLibrary.createAssetAsync(tempFileUri);
    await MediaLibrary.createAlbumAsync("Blind YuGiOh QR Codes", asset, false);
  } catch (error) {
    console.error("Erro ao salvar a imagem na galeria:", error);
  }
}
