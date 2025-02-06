export type Data = {
   title: string;
   attributes: { name: string; value: number; unit: "m" | "kg" }[];
}[];

export type LoginForm = {
   username: string;
   password: string;
};
