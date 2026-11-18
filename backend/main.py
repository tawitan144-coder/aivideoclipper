from fastapi import FastAPI, UploadFile, File, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os

app = FastAPI(title="AI Video Clipper API")

# Konfigurasi CORS agar frontend bisa terhubung ke backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ADMIN_EMAIL = "tawitan144@gmail.com"
UPLOAD_DIR = "uploads/struk"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.get("/")
def read_root():
    return {"message": "AI Video Clipper Backend is Running!"}

# Endpoint Login & Cek Admin Whitelist
@app.post("/api/auth/login")
def login_user(email: str):
    is_admin = (email.lower() == ADMIN_EMAIL.lower())
    return {
        "email": email,
        "is_admin": is_admin,
        "message": "Login berhasil" if not is_admin else "Login Admin Berhasil (Akses Penuh)"
    }

# Endpoint Upload Struk Pembayaran BCA (Auto-masuk ke sistem/galeri admin)
@app.post("/api/payment/upload-struk")
async def upload_struk(email: str, file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Di sini nanti diintegrasikan dengan Telegram Bot Webhook untuk kirim foto ke HP Admin
    return {
        "status": "success", 
        "message": "Struk berhasil diupload. Saldo/Kredit akan segera diverifikasi.",
        "file_saved": file.filename,
        "rekening_tujuan": "BCA 753-609-2721 a.n THANTHAWI"
    }

# Endpoint Admin: Buat Klip Khusus Admin (Tanpa Potong Kuota)
@app.post("/api/admin/create-clip")
def admin_create_clip(email: str, youtube_url: str, duration: int):
    if email.lower() != ADMIN_EMAIL.lower():
        raise HTTPException(status_code=403, status_email="Akses ditolak. Khusus Admin!")
    
    # Logika pemrosesan AI clipper (FFmpeg / Whisper)
    return {
        "status": "success",
        "message": f"Klip berhasil dibuat oleh Admin untuk durasi {duration} detik.",
        "url": youtube_url
    }
