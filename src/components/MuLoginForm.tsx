import { Button, Stack, TextField } from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

interface ILoginForm {
	username: string;
	email: string;
}

const MuLoginForm = () => {
	const { register, handleSubmit, control, formState } = useForm<ILoginForm>();
	const { errors } = formState;
	const onSubmitForm: SubmitHandler<ILoginForm> = (data) => {
		console.log(data);
	};
	return (
		<>
			<h1>Login</h1>
			<form onSubmit={handleSubmit(onSubmitForm)}>
				<Stack spacing={2} width={400}>
					<TextField
						label="Username"
						variant="outlined"
						{...register("username", {
							required: "Username is required",
						})}
						error={!!errors.username}
						helperText={errors.username?.message}
					/>
					<TextField
						label="email"
						variant="outlined"
						{...register("email", {
							required: "Email is required",
						})}
						error={!!errors.email}
						helperText={errors.email?.message}
					/>
					<Button type="submit" variant="contained" color="primary">
						Submit
					</Button>
				</Stack>
			</form>
			<DevTool control={control} />
		</>
	);
};

export default MuLoginForm;
