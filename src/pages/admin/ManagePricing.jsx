import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { getPricing, addPricing, deletePricing } from '../../services/supabase/pricing.service.js'
import { formatCurrency } from '../../utils/formatCurrency.js'
import { supabase } from '../../lib/supabase.js'

function ManagePricing() {
  const { user } = useAuth()
  const [pricingItems, setPricingItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [formData, setFormData] = useState({ service_name: '', price: '', detail_description: '' })
  const [editFormData, setEditFormData] = useState({ service_name: '', price: '', detail_description: '' })
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    if (!user) {
      setError('Anda harus login untuk mengakses halaman ini')
      setLoading(false)
      return
    }
    const fetchPricing = async () => {
      try {
        setLoading(true)
        const { data, error } = await getPricing()
        if (error) {
          throw error
        }
        setPricingItems(data || [])
      } catch (err) {
        setError('Terjadi kesalahan saat memuat pricing')
      } finally {
        setLoading(false)
      }
    }

    fetchPricing()
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleEditChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    })
  }

  const handleEdit = (item) => {
    setEditFormData({
      service_name: item.service_name,
      price: item.price.toString(),
      detail_description: item.detail_description || '',
    })
    setEditingId(item.id)
  }

  const handleCancelEdit = () => {
    setEditFormData({ service_name: '', price: '', detail_description: '' })
    setEditingId(null)
  }

  const handleUpdate = async (id) => {
    setError('')
    setSuccess('')
    setSaving(true)

    try {
      const { error } = await supabase
        .from('pricing')
        .update({
          service_name: editFormData.service_name,
          price: Number(editFormData.price),
          detail_description: editFormData.detail_description
        })
        .eq('id', id)

      if (error) {
        throw error
      }

      // Fetch ulang data untuk memastikan state selalu sinkron
      const { data: updatedData, error: fetchError } = await getPricing()
      if (fetchError) {
        throw fetchError
      }
      setPricingItems(updatedData || [])
      setSuccess('Pricing berhasil diupdate')
      setEditingId(null)
      setEditFormData({ service_name: '', price: '', detail_description: '' })
    } catch (err) {
      setError('Gagal update pricing: ' + (err?.message || err))
    } finally {
      setSaving(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!formData.service_name || !formData.price) {
      setError('Nama layanan dan harga wajib diisi')
      return
    }

    try {
      setSaving(true)
      const payload = {
        service_name: formData.service_name,
        price: Number(formData.price),
        detail_description: formData.detail_description || null,
      }
      const { data, error } = await addPricing(payload)
      if (error) {
        throw error
      }
      // Fetch ulang data untuk memastikan state selalu sinkron
      const { data: updatedData, error: fetchError } = await getPricing()
      if (fetchError) {
        throw fetchError
      }
      setPricingItems(updatedData || [])
      setSuccess('Harga layanan berhasil ditambahkan')
      setFormData({ service_name: '', price: '', detail_description: '' })
    } catch (err) {
      setError('Terjadi kesalahan saat menambahkan pricing: ' + (err?.message || err))
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    setError('')
    setSuccess('')
    setDeletingId(id)

    try {
      const { error } = await deletePricing(id)
      if (error) {
        throw error
      }
      // Fetch ulang data untuk memastikan state selalu sinkron
      const { data: updatedData, error: fetchError } = await getPricing()
      if (fetchError) {
        throw fetchError
      }
      setPricingItems(updatedData || [])
      setSuccess('Harga layanan berhasil dihapus')
    } catch (err) {
      setError('Terjadi kesalahan saat menghapus pricing')
    } finally {
      setDeletingId(null)
    }
  }



  return (
    <div style={{ minHeight: '100vh', padding: '24px', backgroundColor: '#0f172a', color: 'white' }}>
      <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '20px' }}>Manage Pricing</h1>

        {error && (
          <div style={{ marginBottom: '20px', padding: '14px', borderRadius: '12px', backgroundColor: '#b91c1c', color: 'white' }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{ marginBottom: '20px', padding: '14px', borderRadius: '12px', backgroundColor: '#16a34a', color: 'white' }}>
            {success}
          </div>
        )}

        <div style={{ display: 'grid', gap: '24px' }}>
          <section style={{ backgroundColor: '#1e293b', padding: '24px', borderRadius: '20px', border: '1px solid #334155' }}>
            <h2 style={{ marginBottom: '16px' }}>Tambah Harga Layanan</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#cbd5e1' }}>
                  Nama Layanan
                </label>
                <input
                  type="text"
                  name="service_name"
                  value={formData.service_name}
                  onChange={handleChange}
                  placeholder="Contoh: Desain Logo"
                  style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #475569', backgroundColor: '#0f172a', color: 'white' }}
                  required
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#cbd5e1' }}>
                  Harga (Rp)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Contoh: 150000"
                  style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #475569', backgroundColor: '#0f172a', color: 'white' }}
                  required
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#cbd5e1' }}>
                  Detail Deskripsi (Opsional)
                </label>
                <textarea
                  name="detail_description"
                  value={formData.detail_description}
                  onChange={handleChange}
                  placeholder="Contoh: Harga bisa bertambah sesuai tingkat kesulitan dan kompleksitas pekerjaan"
                  rows="3"
                  style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #475569', backgroundColor: '#0f172a', color: 'white', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <button
                  type="submit"
                  disabled={saving}
                  style={{ padding: '14px 20px', borderRadius: '12px', border: 'none', backgroundColor: '#8b5cf6', color: 'white', cursor: saving ? 'not-allowed' : 'pointer' }}
                >
                  {saving ? 'Menyimpan...' : 'Simpan Harga'}
                </button>
              </div>
            </form>
          </section>

          <section style={{ backgroundColor: '#1e293b', padding: '24px', borderRadius: '20px', border: '1px solid #334155' }}>
            <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2>Daftar Harga</h2>
              <span style={{ color: '#94a3b8' }}>{pricingItems.length} item</span>
            </div>

            {loading ? (
              <p>Memuat pricing...</p>
            ) : pricingItems.length === 0 ? (
              <p style={{ color: '#cbd5e1' }}>Belum ada pricing. Tambahkan dulu layanan.</p>
            ) : (
              <div style={{ display: 'grid', gap: '16px' }}>
                {pricingItems.map((item) => (
                  <div key={item.id} style={{ padding: '18px', borderRadius: '16px', backgroundColor: '#111827', border: '1px solid #334155' }}>
                    {editingId === item.id ? (
                      // Edit Form
                      <div style={{ display: 'grid', gap: '16px' }}>
                        <div>
                          <label style={{ display: 'block', marginBottom: '8px', color: '#cbd5e1', fontSize: '14px' }}>
                            Nama Layanan
                          </label>
                          <input
                            type="text"
                            name="service_name"
                            value={editFormData.service_name}
                            onChange={handleEditChange}
                            style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #475569', backgroundColor: '#0f172a', color: 'white' }}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', marginBottom: '8px', color: '#cbd5e1', fontSize: '14px' }}>
                            Harga (Rp)
                          </label>
                          <input
                            type="number"
                            name="price"
                            value={editFormData.price}
                            onChange={handleEditChange}
                            style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #475569', backgroundColor: '#0f172a', color: 'white' }}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', marginBottom: '8px', color: '#cbd5e1', fontSize: '14px' }}>
                            Detail Deskripsi (Opsional)
                          </label>
                          <textarea
                            name="detail_description"
                            value={editFormData.detail_description}
                            onChange={handleEditChange}
                            rows="2"
                            style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #475569', backgroundColor: '#0f172a', color: 'white', resize: 'vertical' }}
                          />
                        </div>

                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                          <button
                            type="button"
                            onClick={() => handleUpdate(item.id)}
                            disabled={saving}
                            style={{ padding: '10px 16px', borderRadius: '10px', border: 'none', backgroundColor: '#16a34a', color: 'white', cursor: saving ? 'not-allowed' : 'pointer' }}
                          >
                            {saving ? 'Menyimpan...' : 'Update'}
                          </button>
                          <button
                            type="button"
                            onClick={handleCancelEdit}
                            style={{ padding: '10px 16px', borderRadius: '10px', border: '1px solid #475569', backgroundColor: 'transparent', color: '#cbd5e1', cursor: 'pointer' }}
                          >
                            Batal
                          </button>
                        </div>
                      </div>
                    ) : (
                      // Display Mode
                      <>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '16px' }}>
                          <div style={{ flex: 1 }}>
                            <h3 style={{ margin: 0 }}>{item.service_name || item.service || 'Nama layanan tidak tersedia'}</h3>
                            <p style={{ margin: '8px 0 0', color: '#94a3b8' }}>{item.detail_description || 'Tidak ada detail deskripsi'}</p>
                          </div>
                          <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
                            <p style={{ margin: 0, fontWeight: '700' }}>{formatCurrency(item.price)}</p>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button
                                type="button"
                                onClick={() => handleEdit(item)}
                                disabled={deletingId === item.id}
                                style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #475569', backgroundColor: '#334155', color: 'white', cursor: deletingId === item.id ? 'not-allowed' : 'pointer', fontSize: '12px' }}
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDelete(item.id)}
                                disabled={deletingId === item.id}
                                style={{ padding: '8px 12px', borderRadius: '8px', border: 'none', backgroundColor: '#ef4444', color: 'white', cursor: deletingId === item.id ? 'not-allowed' : 'pointer', fontSize: '12px' }}
                              >
                                {deletingId === item.id ? 'Menghapus...' : 'Hapus'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

export default ManagePricing
