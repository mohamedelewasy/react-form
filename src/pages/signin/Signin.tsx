import style from "./signin.module.css";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

interface IsigninForm {
  logo: File[];
  username: string;
  password: string;
}

export const Signin = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IsigninForm>({
    mode: "onChange",
  });

  const handleSignin = async (data: IsigninForm) => {
    // const fileBuffer = await data.logo[0].arrayBuffer();
    // const logo = sharp(Buffer.from(fileBuffer))
    // const resizedImage = await logo.resize().toBuffer();
    console.log(data);
  };

  return (
    <div className={style.signin}>
      <form
        className={style.form}
        onSubmit={handleSubmit(handleSignin)}
        noValidate
      >
        <h2>SignIn</h2>
        <div>
          <label htmlFor="logo">logo</label>
          <input
            type="file"
            id="logo"
            autoFocus
            {...register("logo", {
              required: "logo is required",
              validate: {
                countImages: (value: File[]) =>
                  value.length < 2 || "images count exeeded",
                imageSize: (value: File[]) => {
                  for (let i = 0; i < value.length; i++) {
                    if (!value[i].type.startsWith("image/"))
                      return `${value[i].name} must be an image`;
                    if (value[i].size > 1024 * 1024 * 1.7)
                      return `${value[i].name} must be at most 1.7MB`;
                  }
                  return true;
                },
              },
            })}
            multiple
          />
          {errors.logo && <small>{errors.logo.message}</small>}
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            autoFocus
            {...register("username", {
              required: "username is required",
              minLength: {
                value: 3,
                message: "username must be at least 3 characters",
              },
              validate: {
                blacklist: (value) =>
                  value !== "mohamed" || "mohamed is already exists",
              },
            })}
          />
          {errors.username && <small>{errors.username.message}</small>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            {...register("password", {
              required: "password is required",
              minLength: {
                value: 8,
                message: "password must be at least 8 characters",
              },
            })}
          />
          {errors.password && <small>{errors.password.message}</small>}
        </div>
        <div className={style.form_submit}>
          <button type="submit" disabled={!isValid}>
            Submit
          </button>
        </div>
      </form>
      <DevTool control={control} />
    </div>
  );
};
