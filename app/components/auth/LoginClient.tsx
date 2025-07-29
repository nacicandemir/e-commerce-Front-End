"use client";

import { useRouter, useSearchParams } from "next/navigation";
import AuthContainer from "../containers/AuthContainer";
import Button from "../general/Button";
import Input from "../general/Input";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { User } from "@prisma/client";

interface LoginClientProps {
  currentUser: User | null | undefined;
}

const LoginClient: React.FC<LoginClientProps> = ({ currentUser }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    signIn("credentials", {
      ...data,
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
              onClick={() => {}}
              className="flex-1 py-2 mx-1 text-center text-blue-600 font-semibold border-b-2 border-blue-600 cursor-default select-none"
            >
              Giriş Yap
            </button>
            <button
              onClick={() => router.push("/register")}
              className="flex-1 py-2 mx-1 text-center text-gray-500 hover:text-blue-600 hover:border-b-2 hover:border-blue-600 transition cursor-pointer"
            >
              Kayıt Ol
            </button>
          </div>

          {/* Giriş Formu */}
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
          <Button
            type="submit"
            text="Giriş Yap"
            onClick={handleSubmit(onSubmit)}
          />

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

export default LoginClient;
