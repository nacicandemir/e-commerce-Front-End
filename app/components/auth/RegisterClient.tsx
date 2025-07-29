"use client";

import { useRouter } from "next/navigation";
import AuthContainer from "../containers/AuthContainer";
import Button from "../general/Button";
import Input from "../general/Input";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { User } from "@prisma/client";
import { useEffect } from "react";

interface RegisterClientProps {
  currentUser: User | null | undefined;
}
const RegisterClient: React.FC<RegisterClientProps> = ({ currentUser }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    axios.post("/api/register", data).then(() => {
      toast.success("Kullanıcı Olusturuldu...");
      signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      }).then((callback) => {
        if (callback?.ok) {
          router.push("/cart");
          router.refresh();
          toast.success("Login İşlemi Basarılı...");
        }

        if (callback?.error) {
          toast.error(callback.error);
        }
      });
    });
  };

  useEffect(() => {
    if (currentUser) {
      router.push("/cart");
      router.refresh();
    }
  }, []);
  return (
    <div>
      <AuthContainer>
        <div className="w-full md:w-[500px] px-8 py-2 shadow-xl rounded-lg bg-white flex flex-col gap-4">
          {/* Üst Butonlar */}
          <div className="flex justify-around items-center mb-4 border-b border-gray-300">
            <button
              onClick={() => router.push("/login")}
              className="flex-1 py-2 mx-1 text-center text-gray-500 hover:text-blue-600 hover:border-b-2 hover:border-blue-600 transition cursor-pointer"
            >
              Giriş Yap
            </button>
            <button
              onClick={() => router.push("/register")}
              className="flex-1 py-2 mx-1 text-center text-blue-600 font-semibold border-b-2 border-blue-600 cursor-default select-none"
            >
              Kayıt Ol
            </button>
          </div>

          {/* Kayıt ol Formu */}
          <Input
            placeholder="Ad"
            type="text"
            id="name"
            register={register}
            errors={errors}
            required
          />
          <Input
            placeholder="Email"
            type="text"
            id="email"
            register={register}
            errors={errors}
            required
          />
          <Input
            placeholder="Parola"
            type="password"
            id="password"
            register={register}
            errors={errors}
            required
          />
          <Button text="Kayıt Ol" onClick={handleSubmit(onSubmit)} />

          <div className="text-center text-gray-500 font-medium">veya</div>

          <Button
            type="submit"
            text="Google İle Giriş Yap"
            icon={FcGoogle}
            outline
            onClick={() => {
              // Google login işlemi
            }}
          />
        </div>
      </AuthContainer>
    </div>
  );
};

export default RegisterClient;
