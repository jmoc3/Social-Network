import { useState, type FC } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import snIcon from "@/assets/snIcon.png";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "../store/useAuthStore";
import type { RegisterDTO } from "../types";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const RegisterPage: FC = () => {
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterDTO>();
  const { register } = useAuthStore();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<RegisterDTO> = async (body: RegisterDTO) => {
    setLoading(true);
    const res = await register(body);
    setLoading(false);
    if (!res.status) {
      console.log(res);
      toast.error(res.msg);
      return;
    }

    toast.success(res.msg);
    navigate("/");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white grid gap-10 w-fit p-10 rounded-xl shadow relative"
    >
      <div className="grid gap-2 justify-center items-center">
        <div className="grid justify-center w-full h-full">
          <img
            className="w-25 h-25 rounded-full object-cover object-center"
            src={snIcon}
            alt=""
          />
        </div>
        <div>
          <h2 className="text-xl font-bold text-center">Crear usuario</h2>
          <span className="text-sm">Registrate para poder continuar</span>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="flex gap-4">
          <label className="grid gap-2" htmlFor="name">
            Nombre
            <Input
              type="text"
              autoComplete="off"
              placeholder="Juan Perez"
              {...formRegister("name", { required: "Nombre requerido" })}
            />
            {errors.name && (
              <span className="text-xs text-red-400">
                {errors.name.message}
              </span>
            )}
          </label>

          <label className="grid gap-2" htmlFor="dateOfBirth">
            Fecha de nacimiento
            <Input
              type="date"
              autoComplete="off"
              {...formRegister("dateOfBirth", {
                required: "Fecha de nacimiento requerida",
              })}
            />
          {errors.dateOfBirth && (
            <span className="text-xs text-red-400">
              {errors.dateOfBirth.message}
            </span>
          )}
          </label>
        </div>
        <label className="grid gap-2" htmlFor="email">
          Correo
          <Input
            type="email"
            autoComplete="off"
            placeholder="correo@gmail.com"
            {...formRegister("email", {
              required: "Correo requerido",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Correo invalido",
              },
            })}
          />
          {errors.email && (
            <span className="text-xs text-red-400">{errors.email.message}</span>
          )}
        </label>

        <label className="grid gap-2" htmlFor="password">
          Contraseña
          <Input
            type="password"
            autoComplete="off"
            placeholder="********"
            {...formRegister("password", {
              required: "La contraseña es obligatoria",
              minLength: {
                value: 8,
                message: "Debe tener al menos 8 caracteres",
              },
              pattern: {
                value: /(?=.*[0-9])(?=.*[!@#$%^&*=])/,
                message:
                  "Debe incluir al menos un número y un carácter especial (!@#$%^&*=)",
              },
            })}
          />
          {errors.password && (
            <span className="text-xs text-red-400">
              {errors.password.message}
            </span>
          )}
        </label>
        <label className="grid gap-2" htmlFor="password">
          Confirmar contraseña
          <Input
            type="password"
            autoComplete="off"
            placeholder="********"
            {...formRegister("confirmPassword", {
              required: "Confirmacion de contraseña requerida",
            })}
          />
        </label>
        {errors.confirmPassword && (
          <span className="text-xs text-red-400">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>
      <div className="mt-16">
        <button className="flex justify-center absolute left-[50%] -translate-x-1/2 bottom-20 bg-cyan-800 text-white w-50 px-6 text-center py-2 cursor-pointer hover:w-full transition-all border-0">
          {loading ? <Spinner className="size-6" /> : <>Crear Usuario</>}
        </button>
        <span
          className="flex justify-center text-sm hover:cursor-pointer hover:font-bold"
          onClick={() => navigate("/login")}
        >
          Volver
        </span>
      </div>
    </form>
  );
};
