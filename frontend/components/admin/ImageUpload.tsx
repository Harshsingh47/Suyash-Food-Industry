'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Upload, X, Loader2, Image as ImageIcon, Link as LinkIcon, CheckCircle2 } from 'lucide-react';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  required?: boolean;
  helperText?: string;
}

export default function ImageUpload({
  value,
  onChange,
  label = 'Product Image',
  required = false,
  helperText = 'PNG, JPG, WEBP up to 10MB from your computer',
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file (PNG, JPG, WEBP)');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be under 10MB');
      return;
    }

    setError(null);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Upload failed');
      }

      onChange(data.url);
    } catch (err: any) {
      console.error('Upload failed:', err);
      setError(err.message || 'Failed to upload image from your system');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <button
          type="button"
          onClick={() => setMode(mode === 'upload' ? 'url' : 'upload')}
          className="text-[11px] font-semibold text-forest hover:text-forest-dark flex items-center gap-1 transition-colors"
        >
          {mode === 'upload' ? (
            <>
              <LinkIcon className="w-3 h-3" />
              <span>Or enter URL</span>
            </>
          ) : (
            <>
              <Upload className="w-3 h-3" />
              <span>Upload from Computer</span>
            </>
          )}
        </button>
      </div>

      {mode === 'url' ? (
        <div className="space-y-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/images/products/... or https://..."
            className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest"
          />
          {value && (
            <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-stone-200">
              <Image src={value} alt="Preview" fill className="object-cover" />
            </div>
          )}
        </div>
      ) : (
        <div>
          {/* Hidden native system file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/jpg"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileUpload(e.target.files[0]);
              }
            }}
          />

          {value ? (
            /* Uploaded Preview State */
            <div className="relative flex items-center gap-4 p-3 bg-stone-50 border border-stone-200 rounded-2xl group">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-white border border-stone-200 shrink-0">
                <Image src={value} alt="Product image" fill className="object-contain p-1" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-xs font-bold text-forest">
                  <CheckCircle2 className="w-4 h-4 text-forest shrink-0" />
                  <span>Image Selected</span>
                </div>
                <p className="text-[11px] text-stone-500 font-mono truncate mt-1">{value}</p>
                <div className="flex items-center gap-3 mt-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="text-xs font-semibold text-stone-700 hover:text-forest underline"
                  >
                    Change Image
                  </button>
                  <button
                    type="button"
                    onClick={handleRemove}
                    className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* System Upload Drop Zone */
            <div
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`relative border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-forest bg-forest/5 scale-[1.01]'
                  : 'border-stone-300 hover:border-forest hover:bg-stone-50/60'
              }`}
            >
              {isUploading ? (
                <div className="flex flex-col items-center justify-center py-4">
                  <Loader2 className="w-8 h-8 text-forest animate-spin mb-2" />
                  <span className="text-xs font-bold text-stone-700">Uploading from your computer...</span>
                  <span className="text-[11px] text-stone-400 mt-0.5">Please wait</span>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-2">
                  <div className="w-12 h-12 rounded-full bg-forest/10 flex items-center justify-center text-forest mb-3 transition-transform group-hover:scale-110">
                    <Upload className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-bold text-stone-800">
                    Click to browse from your system, or drag & drop
                  </p>
                  <p className="text-[11px] text-stone-500 mt-1">{helperText}</p>
                </div>
              )}
            </div>
          )}

          {error && <p className="text-xs text-red-600 font-medium mt-1.5">{error}</p>}
        </div>
      )}
    </div>
  );
}
