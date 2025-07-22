import { useState } from 'react';
import { Upload, Image, Code, Monitor } from 'lucide-react';

interface ImageSelectorProps {
  onImageSelect: (imageUrl: string) => void;
  currentImage?: string;
}

const presetImages = [
  {
    id: 'code',
    url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjMUUxRTFFIi8+CjxyZWN0IHg9IjQwIiB5PSI0MCIgd2lkdGg9IjcyMCIgaGVpZ2h0PSI1MjAiIGZpbGw9IiMzNzQxNTEiIHJ4PSI4Ii8+Cjx0ZXh0IHg9IjgwIiB5PSIxMDAiIGZpbGw9IiM2MzY2RjEiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMTgiPmNvbnN0IGFwcCA9ICgpID0+IHs8L3RleHQ+Cjx0ZXh0IHg9IjEyMCIgeT0iMTQwIiBmaWxsPSIjMTBCOTgxIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjE2Ij5yZXR1cm4gKDwvdGV4dD4KPHR4dCB4PSIxNjAiIHk9IjE4MCIgZmlsbD0iI0Y1OUU0NSIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxNiI+Jmx0O2RpdiZndDs8L3RleHQ+Cjx0ZXh0IHg9IjIwMCIgeT0iMjIwIiBmaWxsPSIjRkZGRkZGIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjE2Ij5IZWxsbyBXb3JsZCE8L3RleHQ+Cjx0ZXh0IHg9IjE2MCIgeT0iMjYwIiBmaWxsPSIjRjU5RTQ1IiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjE2Ij4mbHQ7L2RpdiZndDs8L3RleHQ+Cjx0ZXh0IHg9IjEyMCIgeT0iMzAwIiBmaWxsPSIjMTBCOTgxIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjE2Ij4pOzwvdGV4dD4KPHR4dCB4PSI4MCIgeT0iMzQwIiBmaWxsPSIjNjM2NkYxIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjE4Ij59PC90ZXh0Pgo8L3N2Zz4K',
    name: 'Code Editor',
    icon: Code,
  },
  {
    id: 'portfolio',
    url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSJsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjNjM2NkYxIDAlLCAjOEM0QUY4IDEwMCUpIi8+CjxjaXJjbGUgY3g9IjQwMCIgY3k9IjMwMCIgcj0iMTAwIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz4KPHN2ZyB4PSIzNDAiIHk9IjI0MCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSIxMjAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuOCkiIHN0cm9rZS13aWR0aD0iMiI+CjxwYXRoIGQ9Im0xMiAzLTEuOTEyIDUuODEzYTIgMiAwIDAgMS0xLjI3NSAxLjI3NWwtNS44MTMgMS45MTIgNS44MTMgMS45MTJhMiAyIDAgMCAxIDEuMjc1IDEuMjc1bDEuOTEyIDUuODEzIDEuOTEyLTUuODEzYTIgMiAwIDAgMSAxLjI3NS0xLjI3NWw1LjgxMy0xLjkxMi01LjgxMy0xLjkxMmEyIDIgMCAwIDEtMS4yNzUtMS4yNzV6Ii8+CjwvcGF0aD4KPC9zdmc+Cjx0ZXh0IHg9IjQwMCIgeT0iNDIwIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuOSkiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjI0IiBmb250LXdlaWdodD0iYm9sZCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UG9ydGZvbGlvPC90ZXh0Pgo8L3N2Zz4K',
    name: 'Portfolio Design',
    icon: Monitor,
  },
  {
    id: 'dashboard',
    url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHg9IjQwIiB5PSI0MCIgd2lkdGg9IjcyMCIgaGVpZ2h0PSI4MCIgZmlsbD0iIzM3NDE1MSIgcng9IjgiLz4KPHN2ZyB4PSI2MCIgeT0iNjAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMiI+CjxwYXRoIGQ9Im0zIDlsMTctMTJ2MTgiLz4KPC9wYXRoPgo8L3N2Zz4KPHN2ZyB4PSI2ODAiIHk9IjYwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjIiPgo8cGF0aCBkPSJtMTkgMjEtNy01IDEtMTAiLz4KPC9wYXRoPgo8L3N2Zz4KPHN2ZyB4PSI3MjAiIHk9IjYwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjIiPgo8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIzIi8+Cjwvc3ZnPgo8cmVjdCB4PSI0MCIgeT0iMTQwIiB3aWR0aD0iMzQwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI0Y3RkFGQyIgcng9IjgiLz4KPHN2ZyB4PSIxODAiIHk9IjIwMCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzM3NDE1MSIgc3Ryb2tlLXdpZHRoPSIyIj4KPHBhdGggZD0iTTMgM2gxOHYxOEgzeiIvPgo8cGF0aCBkPSJtOSA5IDMgMyAzLTMiLz4KPC9wYXRoPgo8L3N2Zz4KPHN2ZyB4PSIxODAiIHk9IjI4MCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjMwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzM3NDE1MSIgc3Ryb2tlLXdpZHRoPSIyIj4KPHN2ZyB4PSI0MjAiIHk9IjE0MCIgd2lkdGg9IjM0MCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiNGN0ZBRkMiIHJ4PSI4Ii8+CjxzdmcgeD0iNTgwIiB5PSIyNDAiIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM2MzY2RjEiIHN0cm9rZS13aWR0aD0iMyI+CjxwYXRoIGQ9Im0xMiAxNSAzLTMgMy0zIi8+CjxwYXRoIGQ9Im0xMiAxNSAzLTMgMy0zIi8+CjwvcGF0aD4KPC9zdmc+Cjx0ZXh0IHg9IjIxMCIgeT0iMzkwIiBmaWxsPSIjMzc0MTUxIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZm9udC13ZWlnaHQ9ImJvbGQiPkFuYWx5dGljczwvdGV4dD4KPHR4dCB4PSI2MjAiIHk9IjM5MCIgZmlsbD0iIzM3NDE1MSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZvbnQtd2VpZ2h0PSJib2xkIj5TYWxlcyBUcmVuZDwvdGV4dD4KPC9zdmc+',
    name: 'Dashboard UI',
    icon: Monitor,
  },
];

export function ImageSelector({ onImageSelect, currentImage }: ImageSelectorProps) {
  const [selectedPreset, setSelectedPreset] = useState<string>('code');

  const handlePresetSelect = (preset: typeof presetImages[0]) => {
    setSelectedPreset(preset.id);
    onImageSelect(preset.url);
  };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.size <= 5 * 1024 * 1024) { // 5MB limit
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result && result.startsWith('data:image/')) {
          onImageSelect(result);
          setSelectedPreset('custom');
        } else {
          console.warn('Invalid image format');
        }
      };
      reader.onerror = () => {
        console.warn('Failed to read file');
      };
      reader.readAsDataURL(file);
    } else {
      console.warn('File too large or invalid');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-3">
        <Image className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
          Laptop Screen Display
        </h4>
      </div>

      {/* Preset Images */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {presetImages.map((preset) => (
          <button
            key={preset.id}
            onClick={() => handlePresetSelect(preset)}
            className={`flex items-center space-x-2 p-3 rounded-lg border transition-all duration-200 ${
              selectedPreset === preset.id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300'
            }`}
          >
            <preset.icon className="w-4 h-4" />
            <span className="text-sm font-medium">{preset.name}</span>
          </button>
        ))}
      </div>

      {/* File Upload */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <label className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors duration-200">
          <div className="flex flex-col items-center space-y-2">
            <Upload className="w-6 h-6 text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Upload custom image
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-500">
              PNG, JPG up to 5MB
            </span>
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileUpload}
          />
        </label>
      </div>
    </div>
  );
}
