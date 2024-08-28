import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface IFormInputs {
	firstName: string;
	age: number;
	email: string;
}

const zodSchema = z.object({
	firstName: z.string().min(1, { message: "First Name is required" }),
	age: z.number().min(1),
	email: z.string().min(5).email("Email is not valid"),
});
const ZodYouTubeForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormInputs>({
		resolver: zodResolver(zodSchema),
	});
	const onSubmit: SubmitHandler<IFormInputs> = (data) => {
		console.log(data);
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div>
				<label>First Name</label>
				<input {...register("firstName")} />
				<p>{errors.firstName?.message}</p>
			</div>
			<div>
				<label>Age</label>
				<input type="number" {...register("age")} />
				<p>{errors.age?.message}</p>
			</div>
			<div>
				<label>Email</label>
				<input {...register("email")} />
				<p>{errors.email?.message}</p>
			</div>
			<button type="submit">Submit</button>
		</form>
	);
};

export default ZodYouTubeForm;
