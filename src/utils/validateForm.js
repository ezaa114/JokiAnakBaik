export const validateRegisterForm = (formData) => {
  const errors = {}

  if (!formData.name) {
    errors.name = 'Nama wajib diisi'
  }

  if (!formData.phone) {
    errors.phone = 'Nomor HP wajib diisi'
  }

  if (!formData.password) {
    errors.password = 'Password wajib diisi'
  }

  if (formData.password && formData.password.length < 6) {
    errors.password = 'Password minimal 6 karakter'
  }

  return errors
}