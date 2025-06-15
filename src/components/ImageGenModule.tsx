
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Palette, Download, Sparkles, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const ImageGenModule = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [prompt, setPrompt] = useState('Generate an AI-themed 3D hero illustration with neon blue and purple gradients, floating geometric shapes, and a futuristic tech aesthetic');
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt to generate an image",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // Simulate image generation with a placeholder
    setTimeout(() => {
      // Using a placeholder image for demo purposes
      setGeneratedImage('https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=512&h=512&fit=crop&crop=entropy&auto=format');
      setLoading(false);
      toast({
        title: "Success",
        description: "Image generated successfully!"
      });
    }, 3000);
  };

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = 'generated-image.png';
      link.click();
      toast({
        title: "Success",
        description: "Image download started"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/dashboard')}
            className="border-white/20 text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex items-center gap-3">
            <Palette className="w-8 h-8 text-neon-coral" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-neon-coral to-neon-orange bg-clip-text text-transparent">
              AI Image Generator
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="glass-dark border-white/10 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Sparkles className="w-5 h-5 text-neon-coral" />
                  Image Prompt
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the image you want to generate..."
                  className="glass-dark border-white/20 text-white min-h-32 resize-none"
                  rows={6}
                />
                
                <Button
                  onClick={handleGenerate}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-neon-coral to-neon-orange hover:scale-105 transition-transform"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Palette className="w-4 h-4 mr-2" />
                      Generate Image
                    </>
                  )}
                </Button>

                {/* Sample Prompts */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-300">Try these prompts:</h4>
                  <div className="space-y-1">
                    {[
                      "Futuristic AI robot in a neon-lit cyberpunk city",
                      "Abstract geometric patterns with holographic effects",
                      "Minimalist tech startup office with AI elements"
                    ].map((samplePrompt, index) => (
                      <button
                        key={index}
                        onClick={() => setPrompt(samplePrompt)}
                        className="text-xs text-neon-aqua hover:text-neon-coral transition-colors block"
                      >
                        "{samplePrompt}"
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Output Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="glass-dark border-white/10 backdrop-blur-xl h-full">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-white">
                  <span className="flex items-center gap-2">
                    <Palette className="w-5 h-5 text-neon-coral" />
                    Generated Image
                  </span>
                  {generatedImage && (
                    <Button
                      onClick={handleDownload}
                      size="sm"
                      variant="outline"
                      className="border-neon-coral/30 text-neon-coral hover:bg-neon-coral/10"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center h-96">
                {loading ? (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 border-4 border-neon-coral/30 border-t-neon-coral rounded-full animate-spin mx-auto"></div>
                    <p className="text-gray-400">Creating your masterpiece...</p>
                  </div>
                ) : generatedImage ? (
                  <div className="space-y-4">
                    <img
                      src={generatedImage}
                      alt="Generated artwork"
                      className="max-w-full max-h-80 rounded-lg border border-white/20 shadow-2xl"
                    />
                    <p className="text-sm text-gray-400 text-center">Your AI-generated image is ready!</p>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <Palette className="w-16 h-16 text-gray-600 mx-auto" />
                    <p className="text-gray-400">Your generated image will appear here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ImageGenModule;
