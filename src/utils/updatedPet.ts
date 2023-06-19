import { PetProps } from "@/app/pets/create/page";
import api from "./api";
import { setFlashMessage } from "./setFlashMessage";

export async function updatedPet(pet: PetProps, token: string) {
  let msgType = "success";

  const formData = new FormData();

  await Object.keys(pet).forEach((key) => {
    if (key === "images") {
      for (let i = 0; i < pet[key].length; i++) {
        formData.append("images", pet[key][i]);
      }
    } else {
      formData.append(key, pet[key]);
    }
  });

  const data = await api
    .patch(`pets/${pet._id}`, formData, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        "Content-Type": "multipart/form-data",
      }
    })
    .then((resp) => resp.data)
    .catch((err) => {
      msgType = "error";
      return err.response.data;
    });

  setFlashMessage(data.message, msgType);
  if(msgType !== 'error'){
    window.location.replace("/pets/mypets");
  }
}
