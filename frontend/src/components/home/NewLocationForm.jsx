import React, { useState, useCallback, useRef } from "react";
import axios from "axios";

import {
  GoogleMap,
  useLoadScript,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";

const libraries = ["places"];

const mapContainerStyle = {
  width: "100%",
  height: "300px",
};

const center = {
  lat: 40.7128,
  lng: -74.006,
};

const NewLocationForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    likes: 0,
    Long: "",
    Lat: "",
    Images: [],
  });

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAL1kzmsE0Hzl28qm5Trp1_s76quJnsHEY",
    libraries,
  });

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevFormData) => ({
      ...prevFormData,
      Images: files,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataWithImages = new FormData();

    formDataWithImages.append("title", formData.title);
    formDataWithImages.append("description", formData.description);
    formDataWithImages.append("likes", formData.likes);
    formDataWithImages.append("Lat", formData.Lat);
    formDataWithImages.append("Long", formData.Long);

    formData.Images.forEach((file, index) => {
      formDataWithImages.append(`Images`, file);
    });

    try {
      const response = await axios.post(
        "http://localhost:3000/uploadimage",
        formDataWithImages,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.status === 200) {
        console.log("Location added successfully!", response.data);
        onClose();
      }
    } catch (err) {
      console.log("Error adding location:", err);
    }
  };

  const onMapClick = useCallback((event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setSelectedLocation({ lat, lng });
    setFormData((prevFormData) => ({
      ...prevFormData,
      Lat: lat,
      Long: lng,
    }));
  }, []);

  const onAutocompleteLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setSelectedLocation({ lat, lng });
        setFormData((prevFormData) => ({
          ...prevFormData,
          Lat: lat,
          Long: lng,
        }));
      } else {
        console.log("No geometry available for the selected place.");
      }
    } else {
      console.log("Autocomplete is not loaded yet.");
    }
  };

  if (loadError) return <div>Error loading map</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-2 text-center text-xl font-medium">
          Add New Location
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full rounded-md border px-2 py-1 shadow-sm focus:outline-none"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full rounded-md border px-2 py-1 shadow-sm focus:outline-none"
            rows={2}
          />

          <div className="mb-2">
            <label className="block text-sm font-semibold">
              Search for a place or click on the map to get the location.
            </label>
            <Autocomplete
              onLoad={onAutocompleteLoad}
              onPlaceChanged={onPlaceChanged}
            >
              <input
                type="text"
                placeholder="Search a place"
                className="w-full rounded-md border px-2 py-1 shadow-sm focus:outline-none"
              />
            </Autocomplete>
          </div>

          <div className="my-4">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={12}
              center={selectedLocation || center}
              onClick={onMapClick}
            >
              {selectedLocation && <Marker position={selectedLocation} />}
            </GoogleMap>
          </div>

          <div className="mb-2 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold">Longitude</label>
              <input
                type="text"
                name="Long"
                value={formData.Long}
                readOnly
                className="w-full rounded-md border bg-gray-100 px-2 py-1 shadow-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold">Latitude</label>
              <input
                type="text"
                name="Lat"
                value={formData.Lat}
                readOnly
                className="w-full rounded-md border bg-gray-100 px-2 py-1 shadow-sm focus:outline-none"
              />
            </div>
          </div>

          <div className="mb-2">
            <label className="block text-sm font-semibold">
              Upload Image(s)
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="w-full rounded-md border px-2 py-1 shadow-sm focus:outline-none"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md bg-gray-400 px-3 py-1 text-white transition-all hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-darker-base-color rounded-md px-3 py-1 text-white shadow-md transition-all duration-300 hover:scale-105"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewLocationForm;
