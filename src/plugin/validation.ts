export type ValidationRules = string[] | ((value: string) => string | boolean)[] | undefined

export const validation: {
	username: ValidationRules,
	password: ValidationRules
} = {
	username: [
		value => !!value || 'Nama pengguna diperlukan',
		value => (value && value.length >= 3 && value.length <= 16) || 'Nama pengguna harus terdiri dari 3 hingga 16 karakter',
		value => /^[a-zA-Z0-9_-]*$/.test(value) || 'Hanya diperbolehkan huruf, angka, garis bawah, dan tanda hubung.'
	],
	password: [
		value => !!value || 'Password diperlukan',
		value => (value && value.length >= 8) || 'Password harus terdiri dari minimal 8 karakter',
		value => /[a-z]/.test(value) || 'Password harus mengandung minimal 1 huruf kecil',
		value => /[A-Z]/.test(value) || 'Password harus mengandung minimal 1 huruf besar',
		value => /\d/.test(value) || 'Password harus mengandung minimal 1 angka',
		value => /[@$!%*?&]/.test(value) || 'Password harus mengandung minimal 1 karakter khusus'
	],
}