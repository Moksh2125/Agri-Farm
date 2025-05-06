import React, { useState, useRef } from 'react';
import { Camera, Upload, Image as ImageIcon, AlertCircle, CheckCircle, X, Loader } from 'lucide-react';

interface AnalysisResult {
  health: 'healthy' | 'issues' | 'disease';
  confidence: number;
  issue?: string;
  recommendation?: string;
}

const ImageUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const validateAndSetFile = (file: File) => {
    // Reset states
    setError(null);
    setAnalysisResult(null);
    
    // Check file type
    if (!file.type.match('image.*')) {
      setError('Please select an image file (PNG, JPG, JPEG)');
      return;
    }
    
    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError('File is too large. Maximum size is 5MB');
      return;
    }
    
    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
  };

  const startCamera = async () => {
    setShowCamera(true);
    setSelectedFile(null);
    setPreview(null);
    setAnalysisResult(null);
    setError(null);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Could not access camera. Please check permissions.');
      setShowCamera(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setShowCamera(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw video frame to canvas
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert canvas to blob
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
            validateAndSetFile(file);
            stopCamera();
          }
        }, 'image/jpeg');
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const analyzeImage = () => {
    if (!selectedFile) return;
    
    setIsAnalyzing(true);
    
    // Mock analysis - in a real app, this would be an API call to your backend
    setTimeout(() => {
      // Random result for demo purposes
      const results: AnalysisResult[] = [
        { 
          health: 'healthy', 
          confidence: 92,
          recommendation: 'Continue with your current care routine. The crop is showing excellent health indicators.'
        },
        { 
          health: 'issues', 
          confidence: 78,
          issue: 'Nutrient deficiency',
          recommendation: 'Consider applying a balanced NPK fertilizer. The yellowing of leaves indicates potential nitrogen deficiency.'
        },
        { 
          health: 'disease', 
          confidence: 85,
          issue: 'Fungal infection (Powdery mildew)',
          recommendation: 'Apply a fungicide treatment as soon as possible. Remove and destroy affected leaves to prevent spread.'
        }
      ];
      
      const randomResult = results[Math.floor(Math.random() * results.length)];
      setAnalysisResult(randomResult);
      setIsAnalyzing(false);
    }, 2000);
  };

  const resetStates = () => {
    setSelectedFile(null);
    setPreview(null);
    setAnalysisResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Crop Image Analysis</h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Upload or capture photos of your crops to identify diseases, pests, or nutrient deficiencies and receive treatment recommendations.
        </p>
      </div>
      
      {showCamera ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Camera Capture</h2>
            <button 
              onClick={stopCamera}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="relative bg-black rounded-lg overflow-hidden">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              className="w-full h-auto"
            ></video>
            <canvas ref={canvasRef} className="hidden"></canvas>
          </div>
          
          <div className="mt-4 flex justify-center">
            <button
              onClick={capturePhoto}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <Camera className="h-5 w-5 mr-2" />
              Capture Photo
            </button>
          </div>
        </div>
      ) : (
        <div 
          className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8 ${!preview ? 'border-2 border-dashed border-gray-300 dark:border-gray-600' : ''}`}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {!preview ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="p-4 bg-green-100 dark:bg-green-900 rounded-full mb-4">
                <Upload className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Upload an Image</h2>
              <p className="text-gray-500 dark:text-gray-400 text-center mb-6 max-w-md">
                Drag and drop an image here, or click the buttons below to upload from your device or use your camera
              </p>
              
              {error && (
                <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  {error}
                </div>
              )}
              
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <ImageIcon className="h-5 w-5 mr-2" />
                  Select Image
                </button>
                
                <button
                  onClick={startCamera}
                  className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <Camera className="h-5 w-5 mr-2" />
                  Use Camera
                </button>
              </div>
              
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileInputChange}
                accept="image/*"
                className="hidden"
              />
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Image Preview</h2>
                <button 
                  onClick={resetStates}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 mb-4">
                <img 
                  src={preview} 
                  alt="Crop preview" 
                  className="w-full h-auto object-contain max-h-96"
                />
              </div>
              
              {!isAnalyzing && !analysisResult && (
                <div className="flex justify-center">
                  <button
                    onClick={analyzeImage}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Analyze Image
                  </button>
                </div>
              )}
              
              {isAnalyzing && (
                <div className="flex flex-col items-center justify-center py-6">
                  <Loader className="h-10 w-10 text-green-600 dark:text-green-400 animate-spin mb-4" />
                  <p className="text-gray-700 dark:text-gray-300">Analyzing your image...</p>
                </div>
              )}
              
              {analysisResult && (
                <div className={`
                  mt-6 p-6 rounded-lg border 
                  ${analysisResult.health === 'healthy' ? 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800' : 
                    analysisResult.health === 'issues' ? 'bg-yellow-50 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800' : 
                    'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800'}
                `}>
                  <div className="flex items-center mb-4">
                    {analysisResult.health === 'healthy' ? (
                      <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400 mr-3" />
                    ) : analysisResult.health === 'issues' ? (
                      <AlertCircle className="h-8 w-8 text-yellow-600 dark:text-yellow-400 mr-3" />
                    ) : (
                      <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400 mr-3" />
                    )}
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {analysisResult.health === 'healthy' ? 'Healthy Crop' : 
                          analysisResult.health === 'issues' ? 'Minor Issues Detected' : 
                          'Disease Detected'}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Confidence: {analysisResult.confidence}%
                      </p>
                    </div>
                  </div>
                  
                  {analysisResult.issue && (
                    <div className="mb-3">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-1">Issue Identified:</h4>
                      <p className="text-gray-700 dark:text-gray-300">{analysisResult.issue}</p>
                    </div>
                  )}
                  
                  {analysisResult.recommendation && (
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-1">Recommendation:</h4>
                      <p className="text-gray-700 dark:text-gray-300">{analysisResult.recommendation}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Tips for Better Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-10 w-10 rounded-md bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400">
                <span className="text-xl font-bold">1</span>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Clear Focus</h3>
              <p className="mt-1 text-gray-600 dark:text-gray-300">
                Ensure the image is clear and in focus. Blurry images can lead to inaccurate results.
              </p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-10 w-10 rounded-md bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400">
                <span className="text-xl font-bold">2</span>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Good Lighting</h3>
              <p className="mt-1 text-gray-600 dark:text-gray-300">
                Take photos in good natural light for the most accurate colors and details.
              </p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-10 w-10 rounded-md bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400">
                <span className="text-xl font-bold">3</span>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Close-Up</h3>
              <p className="mt-1 text-gray-600 dark:text-gray-300">
                For disease detection, take close-up photos of affected areas to show symptoms clearly.
              </p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-10 w-10 rounded-md bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400">
                <span className="text-xl font-bold">4</span>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Multiple Angles</h3>
              <p className="mt-1 text-gray-600 dark:text-gray-300">
                Upload photos from different angles for a more comprehensive analysis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;