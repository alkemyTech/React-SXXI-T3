import React, { useEffect, useState } from "react";
import { useFormik } from "formik";

import { getOrganizationInfo } from "../../../Services/organizationService/organizationService";
import { getSlides } from "../../../Services/slidesServices/slidesService";
import { BackButton, TextAreaField } from "../../Form";
import SliderTemplate from "../../Slides/Slider/Template/SliderTemplate";
import Carousel from "../../Carousel/Carousel";
import Button from "../../Button/Button";
import { ReactComponent as RemoveSvg } from "../../../assets/svg/home/xmark-solid.svg";
import { ReactComponent as AddSvg } from "../../../assets/svg/home/plus-solid.svg";
import { initialValues, validationSchema } from "./constants";

import "./HomeForm.css";

const HomeForm = () => {
  const [slides, setSlides] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const onSubmit = () => {
    setSubmitting(false);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const {
    handleSubmit,
    isSubmitting,
    handleChange,
    handleBlur,
    setSubmitting,
    setFieldValue,
    setFieldTouched,
    values,
  } = formik;

  useEffect(() => {
    setIsFetching(true);
    getOrganizationInfo()
      .then((response) => {
        setFieldValue("welcomeText", response.welcome_text);
      })
      .catch((error) => {})
      .finally(() => {
        setIsFetching(false);
      });
    getSlides()
      .then((response) => {
        const actualSlides = response
          .sort((a, b) => a.order < b.order)
          .slice(0, 3);
        setSlides(response);
        setFieldValue("slides", actualSlides);
      })
      .catch((error) => {})
      .finally(() => {
        setIsFetching(false);
      });
  }, [setFieldValue]);

  const isSelected = (id) => {
    return values.slides.some((slide) => slide.id === id);
  };

  const handleSelectSlide = (slide) => {
    setFieldTouched("slides", true, true);
    if (isSelected(slide.id)) {
      setFieldValue(
        "slides",
        values.slides.filter((item) => item.id !== slide.id)
      );
    } else {
      setFieldValue("slides", [...values.slides, slide]);
    }
  };

  const SliderSelectTemplate = (props) => {
    return (
      <>
        <SliderTemplate {...props} imageClassName="select-preview">
          <div className="utils-container">
            <Button
              label={isSelected(props.id) ? <RemoveSvg /> : <AddSvg />}
              onClick={() => handleSelectSlide(props)}
              type="button"
              variant="text"
              className="select-button"
            />
          </div>
        </SliderTemplate>
      </>
    );
  };

  const isLoading = isFetching || isSubmitting;

  return (
    <div className={isLoading ? "main-container pulse" : "main-container"}>
      <form
        onSubmit={handleSubmit}
        className="form-container homeform-container"
      >
        <h1 className="form-title">
          <BackButton />
          Actualizar datos de inicio
        </h1>
        <div className="textarea-container">
          <TextAreaField
            name="welcomeText"
            value={formik.values.welcomeText}
            touched={formik.touched.welcomeText}
            onBlur={handleBlur("welcomeText")}
            onChange={handleChange("welcomeText")}
            errors={formik.errors.welcomeText}
            label="Texto de bienvenida"
          />
        </div>
        <div className="slider-container">
          <h3 className="homeform-title">
            Seleccione los slides <small>({values.slides.length}/3)</small>
          </h3>
          <Carousel
            itemList={slides}
            itemKey="id"
            ItemTemplate={SliderSelectTemplate}
            autoplay={false}
            className="carousel-slider-select"
          />
          {formik.errors.slides && formik.touched.slides && (
            <div className="errors-container">{formik.errors.slides}</div>
          )}
        </div>
        <div className="button-container">
          <Button label="Enviar" variant="primary" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default HomeForm;
