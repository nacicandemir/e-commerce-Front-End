"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Heading from "../general/Heading";
import Input from "../general/Input";
import Checkbox from "../general/Checkbox";
import ChoiceInput from "../general/ChoiceInput";
import Button from "../general/Button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";


const CreateForm = () => {
  const router = useRouter();

  const categoryList = [
    { name: "Erkek" },
    { name: "Kadın" },
    { name: "Elektronik" },
    { name: "Kozmetik" },
    { name: "Ev & Yaşam" },
    { name: "Süpermarket" },
    { name: "Çok Satanlar" },
    { name: "Spor Malzemeleri" },
    { name: "Kitap & Müzik" },
    { name: "Oyun & Hobi" },
  ];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      brand: "",
      category: "",
      price: "",
      image: "",
      inStock: false,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await axios.post("/api/product",{ ...data, externalId: undefined });
      toast.success("Ürün ekleme işlemi başarılı!");
      router.refresh();
    } catch (error) {
      console.error("Ürün eklenemedi:", error);
      toast.error("Ürün eklenirken bir hata oluştu.");
    }
  };

  const category = watch("category");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  return (
    <div>
      <Heading text="ÜRÜN OLUŞTUR" center />

      <Input
        placeholder="Ad"
        type="text"
        id="name"
        register={register}
        errors={errors}
        required
      />

      <Input
        placeholder="Açıklama"
        type="text"
        id="description"
        register={register}
        errors={errors}
        required
      />

      <Input
        placeholder="Marka"
        type="text"
        id="brand"
        register={register}
        errors={errors}
        required
      />

      <Input
        placeholder="Fiyat"
        type="number"
        id="price"
        register={register}
        errors={errors}
        required
      />

      <Checkbox
        id="inStock"
        label="Ürün Stokta Mevcut mu?"
        register={register}
      />

      <div className="flex flex-wrap gap-3 my-4">
        {categoryList.map((cat) => (
          <ChoiceInput
            key={cat.name}
            text={cat.name}
            onClick={() => setCustomValue("category", cat.name)}
            selected={category === cat.name}
          />
        ))}
      </div>

      <Input
        placeholder="Ürünün Fotoğraf Linkini Giriniz..."
        type="text"
        id="image"
        register={register}
        errors={errors}
        required
      />

      <Button text="Ürün Oluştur" onClick={handleSubmit(onSubmit)} />
    </div>
  );
};

export default CreateForm;
