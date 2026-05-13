import React, { useState } from 'react'

function UploadResult() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploadStatus, setUploadStatus] = useState('')

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setSelectedFile(file)
    setUploadStatus('')
  }

  const handleUpload = () => {
    if (!selectedFile) {
      setUploadStatus('Pilih file terlebih dahulu')
      return
    }

    // Simulate upload process
    setUploadStatus('Mengupload...')
    setTimeout(() => {
      setUploadStatus('File berhasil diupload!')
    }, 2000)
  }

  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb'
      }}
    >
      <h3
        style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#111827',
          marginBottom: '20px'
        }}
      >
        Upload Hasil Pekerjaan
      </h3>

      <div
        style={{
          marginBottom: '20px'
        }}
      >
        <input
          type="file"
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx,.zip,.rar"
          style={{
            display: 'block',
            marginBottom: '12px'
          }}
        />

        {selectedFile && (
          <p
            style={{
              fontSize: '14px',
              color: '#6b7280',
              marginBottom: '12px'
            }}
          >
            File dipilih: {selectedFile.name}
          </p>
        )}

        <button
          onClick={handleUpload}
          disabled={!selectedFile}
          style={{
            backgroundColor: selectedFile ? '#8b5cf6' : '#d1d5db',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: selectedFile ? 'pointer' : 'not-allowed'
          }}
        >
          Upload File
        </button>
      </div>

      {uploadStatus && (
        <p
          style={{
            fontSize: '14px',
            color: uploadStatus.includes('berhasil') ? '#10b981' : '#ef4444',
            fontWeight: '500'
          }}
        >
          {uploadStatus}
        </p>
      )}

      <div
        style={{
          marginTop: '20px',
          padding: '16px',
          backgroundColor: '#f9fafb',
          borderRadius: '6px',
          border: '1px solid #e5e7eb'
        }}
      >
        <h4
          style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '8px'
          }}
        >
          Instruksi Upload:
        </h4>
        <ul
          style={{
            fontSize: '14px',
            color: '#6b7280',
            margin: '0',
            paddingLeft: '20px'
          }}
        >
          <li>Format file yang didukung: PDF, DOC, DOCX, ZIP, RAR</li>
          <li>Ukuran maksimal: 10MB</li>
          <li>Pastikan file tidak mengandung virus</li>
        </ul>
      </div>
    </div>
  )
}

export default UploadResult