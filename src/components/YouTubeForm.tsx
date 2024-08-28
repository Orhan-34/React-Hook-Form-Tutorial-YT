import {
	type SubmitErrorHandler,
	type SubmitHandler,
	useFieldArray,
	useForm,
} from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";

type Inputs = {
	email: string;
	username: string;
	channel: string;
	social: {
		facebook: string;
		instagram: string;
		twitter: string;
	};
	phoneNumbers: string[];
	phNumbers: {
		number: string;
	}[];
	age: number;
	birthday: Date;
};

export const YouTubeForm = () => {
	const forms = useForm<Inputs>({
		// defaultValues: async () => {
		// 	const response = await fetch(
		// 		"https://jsonplaceholder.typicode.com/users?id=3",
		// 	);
		// 	const data = await response.json();
		// 	return {
		// 		email: data[0].email,
		// 		username: data[0].username,
		// 		channel: data[0].company.name,
		// 		social: {
		// 			facebook: "orhanSoftware",
		// 			instagram: "orhanSoftware",
		// 			twitter: "orhanSoftware",
		// 		},
		// 		phoneNumbers: ["", ""],
		// 		phNumbers: [{ number: "" }],
		// 		age: 0,
		// 		birthday: new Date(),
		// 	};
		// },
		defaultValues: {
			email: "",
			username: "",
			channel: "",
			social: {
				facebook: "",
				instagram: "",
				twitter: "",
			},
			phoneNumbers: ["", ""],
			phNumbers: [{ number: "" }],
			age: 0,
			birthday: new Date(),
		},
		mode: "all",
	});
	const {
		register,
		handleSubmit,
		control,
		formState,
		watch,
		getValues,
		setValue,
		reset,
		trigger,
	} = forms;
	const { errors, isSubmitSuccessful } = formState;

	const { fields, append, remove } = useFieldArray({
		name: "phNumbers",
		control,
	});

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		console.log(data);
	};

	const onError: SubmitErrorHandler<Inputs> = (errors) => {
		console.log(errors);
	};

	const getValuesHandler = () => {
		const values = getValues();
		console.log(values);
	};

	const setValueHandler = () => {
		setValue("age", 19);
	};

	// useEffect(() => {
	// 	const subscription = watch(() => {});
	// 	return () => subscription.unsubscribe();
	// }, [watch]);

	useEffect(() => {
		if (isSubmitSuccessful) {
			reset();
		}
	}, [isSubmitSuccessful, reset]);

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit, onError)}>
				<div className="form-control">
					<label htmlFor="username">Username:</label>
					<input
						type="text"
						id="username"
						{...register("username", {
							required: {
								value: true,
								message: "This field is required",
							},
						})}
					/>
					<p className="error">{errors.username?.message}</p>

					<label htmlFor="email">E-mail</label>
					<input
						type="email"
						id="email"
						{...register("email", {
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
								message: "Email is invalid",
							},
							disabled: watch("username") === "",
							validate: {
								notAdmin: (value) => {
									return value !== "admin@gmail.com" || "Admin is not allowed";
								},
								blackListed: (value) => {
									return (
										!value.endsWith("badadmin.com") || "Email is blacklisted"
									);
								},
								emailAvailable: async (fieldValue) => {
									const response = await fetch(
										`https://jsonplaceholder.typicode.com/users?email=${fieldValue}`,
									);
									const data = await response.json();
									return data.length === 0 || "Email is already taken";
								},
							},
						})}
					/>
					<p className="error">{errors.email?.message}</p>
				</div>

				<div className="form-control">
					<label htmlFor="channel">Channel</label>
					<input
						type="text"
						id="channel"
						{...register("channel", {
							required: {
								value: true,
								message: "Channel is required",
							},
						})}
					/>
					<p className="error">{errors.channel?.message}</p>
				</div>
				<div className="form-control">
					<label htmlFor="facebook">Facebook</label>
					<input type="text" id="facebook" {...register("social.facebook")} />
				</div>
				<div className="form-control">
					<label htmlFor="instagram">Instagram</label>
					<input type="text" id="instagram" {...register("social.instagram")} />
				</div>
				<div className="form-control">
					<label htmlFor="twitter">Twitter</label>
					<input type="text" id="twitter" {...register("social.twitter")} />
				</div>
				<div className="form-control">
					<label htmlFor="primary-number">Primary Phone Number</label>
					<input
						type="text"
						id="primary-number"
						{...register("phoneNumbers.0")}
					/>
				</div>
				<div className="form-control">
					<label htmlFor="secondary-number">Secondary Phone Number</label>
					<input
						type="text"
						id="secondary-number"
						{...register("phoneNumbers.1")}
					/>
				</div>
				<div>
					<label>List of phone numbers</label>
					<div>
						{fields.map((field, index) => {
							return (
								<div className="form-conrol" key={field.id}>
									<input
										type="text"
										{...register(`phNumbers.${index}.number` as const)}
									/>
									{index > 0 && (
										<button type="button" onClick={() => remove()}>
											Remove
										</button>
									)}
								</div>
							);
						})}
						<button type="button" onClick={() => append({ number: "" })}>
							Add phone number
						</button>
					</div>
					<div className="form-control">
						<label htmlFor="age">Age</label>
						<input
							type="number"
							id="age"
							{...register("age", {
								required: {
									value: true,
									message: "Age is required",
								},
								valueAsNumber: true,
							})}
						/>
						<p className="error">{errors.age?.message}</p>
					</div>
					<div className="form-control">
						<label htmlFor="dob">Date of Birthday</label>
						<input
							type="date"
							id="dob"
							{...register("birthday", {
								required: {
									value: true,
									message: "Date Of Birthday is required",
								},
								valueAsDate: true,
							})}
						/>
						<p className="error">{errors.birthday?.message}</p>
					</div>
				</div>
				<button type="button" onClick={() => reset()}>
					Reset
				</button>
				<button type="button" onClick={() => getValuesHandler()}>
					Get Values
				</button>
				<button type="button" onClick={() => setValueHandler()}>
					Set Value
				</button>
				<button type="button" onClick={() => trigger("birthday")}>
					Trigger Validation
				</button>
				<button type="submit">Submit</button>
			</form>
			<DevTool control={control} />
		</>
	);
};
