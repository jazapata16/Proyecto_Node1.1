import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button } from "../components/ui";
import { useOrders } from "../context/ordersContext";
import { useForm } from "react-hook-form";
import axios from "../api/axios";

dayjs.extend(utc);

export function OrderFormPage() {
  const {createOrder, updateOrder } = useOrders();

  const [imageUrls, setImageUrls] = useState([]);
  const [paisBillinginfo, setpaisBillinginfo] = useState([]);
  const [provinciaBillingInfo, setprovinciaBillingInfo] = useState([]);
  const [ciudadBillingInfo, setciudadBillingInfo] = useState([]);
  const [provinciaShippinginfo, setprovinciaShippingInfo] = useState([]);
  const [paisShippingInfo, setpaisShippingingInfo] = useState([]);
  const [ciudadShippingInfo, setciudadShippingInfo] = useState([]);
  const [filelist, setfilelist] = useState([]);
  const [title, setTitle] = useState([]);
  const navigate = useNavigate();
  const params = useParams();
  const {handleSubmit,formState: { errors },} = useForm();
  const [isChecked, setIsChecked] = useState(true);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handlePaisInputChange= async(e) => {
    setpaisShippingingInfo(e.target.value);
    if (isChecked){
      setpaisBillinginfo(e.target.value);
    }
  }

  const handleProvinciaInputChange= async(e) => {
    setprovinciaShippingInfo(e.target.value);
    if (isChecked){
      setprovinciaBillingInfo(e.target.value);
    }
  }

  const handleCiudadInputChange = async(e) => {
    setciudadShippingInfo(e.target.value);
    if (isChecked){
      setciudadBillingInfo(e.target.value);
    }
  }

  const handlePaisBiInputChange= async(e) => {
    setpaisBillinginfo(e.target.value);
  }

  const handleProvinciaBiInputChange= async(e) => {
    setprovinciaBillingInfo(e.target.value);
  }

  const handleCiudadBiInputChange = async(e) => {
    setciudadBillingInfo(e.target.value);
  }

  const onSubmit = async (values) => {
    const InfoSh = paisShippingInfo+"/"+provinciaShippinginfo+"/"+ciudadShippingInfo;
    const InfoBi = paisBillinginfo+"/"+provinciaBillingInfo+"/"+ciudadBillingInfo;
    const formData = new FormData();
    filelist.forEach((file) => {
      formData.append("photos", file);
    });
    sessionStorage.setItem("title", title);
    sessionStorage.setItem("billingInfo", InfoBi );
    sessionStorage.setItem("shippingInfo", InfoSh );

    try {
      const miPromesa = axios.post(`/upload`, formData);
      console.log('WAIT, LOADING...')

      miPromesa.then((response) => {
        // La promesa se resolvió con éxito y tienes el resultado de la solicitud
        //setImageUrls(response.data.urls);
        const formDataObj = new FormData();
        const urlArray = response.data.urls;
        formDataObj.append("urlimages", urlArray );
        formDataObj.append("title", title);
        formDataObj.append("billingInfo", InfoBi );
        formDataObj.append("shippingInfo", InfoSh);
        const param = new URLSearchParams(formDataObj);
        // Convertir los pares clave-valor a un objeto JavaScript
        const jsonObject = {};
        for (const [key, value] of param) {
          jsonObject[key] = value;
        }
        // Convertir el objeto JavaScript a formato JSON
        if (params.id) {
          updateOrder(params.id, {
            ...values,
            date: dayjs.utc(values.date).format(),
            images: imageUrls,
          });

        } else {
          createOrder(jsonObject);
          navigate("/resumen",{ state: jsonObject });
        }
      }).catch((error) => {
        console.log('Error:', error);
      });

    } catch (error) {
      console.log("Error:", error);
    }
  };

    const handleFileInputChange = async (e) => {
      const files = e.target.files;
      setfilelist((prevPhotos) => [...prevPhotos, ...Array.from(files)]);
      const photoUrls = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const photoUrl = URL.createObjectURL(file);
        photoUrls.push(photoUrl);
      };
      sessionStorage.setItem('photos', JSON.stringify(photoUrls));
    }

  const handleTitleChange = async (e) => {
    console.log(e.target.value)
    setTitle(e.target.value);
};

  useEffect(() => {
    console.log(filelist);
    console.log(imageUrls);
  }, [filelist,imageUrls,title]);

  const handleDeletePhoto = (index) => {
    const updatedPhotos = [...filelist];
    updatedPhotos.splice(index, 1);
    setfilelist(updatedPhotos);
  };

  return (
    <div className="step1-container">
      <h2>ORGANIZA TU ÁLBUM!! Arrastra y suelta o Carga una Imagen</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="photo-drop-area" onDragOver={(e) => e.preventDefault()} onDrop={handleFileInputChange}>
          {filelist.map((photo, index) => (
            <div key={index}>
              <img
                className="photo-preview"
                src={URL.createObjectURL(photo)}
                alt={photo.name}
              />
              <div className="delete-photo">
                <button onClick={() => handleDeletePhoto(index)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
        <input type="file" name="nameimages" onChange={handleFileInputChange} multiple />
        <input type="text" name="title" onChange={handleTitleChange} className="text-black" placeholder="Nombre del Álbum" />
        <div className="shipping-page">
          <h2>Información de Envío</h2>
            <div>
              Pais:
              <input
                type="text"
                onChange={handlePaisInputChange}
                className="text-black items-center mt-4 ml-4"
              />
            </div>
            <div>
              Provincia:
              <input
                type="text"
                onChange={handleProvinciaInputChange}
                className="text-black items-center mt-4 ml-4"
              />
            </div>
            <div>
              Ciudad:
              <input
                type="text"
                onChange={handleCiudadInputChange}
                className="text-black items-center mt-4 ml-4"
              />
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                Usar mismos datos de Envío
              </label>
            </div>
          <h2>Información de Facturacion</h2>
          <div>
              Pais:
              <input
                type="text"
                onChange={handlePaisBiInputChange}
                className="text-black items-center mt-4 ml-4"
                disabled={isChecked}
              />
            </div>
            <div>
              Provincia:
              <input
                type="text"
                onChange={handleProvinciaBiInputChange}
                className="text-black items-center mt-4 ml-4"
                disabled={isChecked}
              />
            </div>
            <div>
              Ciudad:
              <input
                type="text"
                onChange={handleCiudadBiInputChange }
                className="text-black items-center mt-4 ml-4"
                disabled={isChecked}
              />
            </div>
          
        </div>
        {filelist.length > 0 && <Button type="submit">Generar Compra</Button>}
      </form>
    </div>
  );
}
