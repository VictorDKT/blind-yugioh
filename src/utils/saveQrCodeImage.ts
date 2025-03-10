import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { AccessibilityInfo } from "react-native";

export async function saveQRCodeImage(qrRef: any, cardName: string) {
  try {
    const { granted } = await MediaLibrary.requestPermissionsAsync();

    if (!granted) {
      console.log("Permissão negada para acessar a galeria.");
      return;
    }

    const sanitizedCardName = cardName.replace(/[^a-zA-Z0-9.-_ ]+/g, '_');
    const tempFileUri = FileSystem.documentDirectory + `${sanitizedCardName} QR-Code.png`;

    const uri = await qrRef.capture();
    if (!uri) {
      console.error("Falha na captura. URI não recebida.");
      return;
    }

    await FileSystem.moveAsync({
      from: uri,
      to: tempFileUri,
    });
    
    const asset = await MediaLibrary.createAssetAsync(tempFileUri);

    const albums = await MediaLibrary.getAlbumsAsync();
    const albumName = "Blind YuGiOh QR Codes";
    const album = albums.find((a) => a.title === albumName);

    if (album) {
      await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
    } else {
      await MediaLibrary.createAlbumAsync(albumName, asset, false);
    }

    AccessibilityInfo.announceForAccessibility(`O arquivo ${sanitizedCardName} QR-Code.png foi salvo na pasta ${albumName} em sua galeria.`);
  } catch (error) {
    console.error("Erro ao salvar a imagem na galeria:", error);
  }
}