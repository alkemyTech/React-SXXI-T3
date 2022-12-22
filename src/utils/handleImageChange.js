export const handleImageChange = (event, handleChange, setImagePreview) => {
    const file = event.target.files[0];
    if (file) {
        handleChange(event);
        if (file.type.includes("image")) {
            setImagePreview(URL.createObjectURL(file));
        }
    }
};