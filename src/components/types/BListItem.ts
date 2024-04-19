import type { pallete } from "@/plugin/palette";
import type { BIconName } from "./BIcon";

export type BListItemProps = {
	icon: BIconName,
  title: string,
	data?: string,
	rightIcon?: BIconName,
	color?: keyof typeof pallete.schemes.light,
	classData?: string,
}