import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { useCodeLens } from "@/hooks/useCodeLens";
import LoadingState from "../LoadingState";
import OutputCard from "../OutputCard";
import { Button } from "../ui/button";
import { Copy, Download, RefreshCw, FileCode } from "lucide-react";
import { toast } from "sonner";
import Editor from "@monaco-editor/react";

const CodeLens = () => {
  const { user } = useAuth();
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const { analyzeCode, isAnalyzing, analysis } = useCodeLens();

  const languages = [
    { value: "python", label: "Python" },
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "java", label: "Java" },
    { value: "cpp", label: "C++" },
    { value: "csharp", label: "C#" },
    { value: "go", label: "Go" },
    { value: "rust", label: "Rust" },
    { value: "php", label: "PHP" },
    { value: "ruby", label: "Ruby" },
  ];

  const dummyMLCode = {
    python: `import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import matplotlib.pyplot as plt

# Load and prepare data
def load_data():
    # Simulate loading a dataset
    np.random.seed(42)
    n_samples = 1000
    n_features = 20
    
    # Generate synthetic dataset
    X = np.random.randn(n_samples, n_features)
    y = (X[:, 0] + X[:, 1] + np.random.randn(n_samples) * 0.1 > 0).astype(int)
    
    return X, y

# Feature engineering with nested loops (inefficient)
def engineer_features(X):
    engineered_features = []
    for i in range(len(X)):
        feature_row = []
        for j in range(len(X[i])):
            # Inefficient nested computation
            for k in range(j):
                feature_row.append(X[i][j] * X[i][k])
        engineered_features.append(feature_row)
    return np.array(engineered_features)

# Train model with poor practices
def train_model(X, y):
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Engineer features (inefficient way)
    X_train_eng = engineer_features(X_train)
    X_test_eng = engineer_features(X_test)
    
    # Train multiple models inefficiently
    models = []
    for i in range(10):  # Redundant training
        model = RandomForestClassifier(n_estimators=100, random_state=i)
        model.fit(X_train_eng, y_train)
        models.append(model)
    
    # Use only the last model (wasteful)
    final_model = models[-1]
    
    # Make predictions
    y_pred = final_model.predict(X_test_eng)
    
    # Calculate metrics
    accuracy = accuracy_score(y_test, y_pred)
    
    return final_model, accuracy

# Main execution
if __name__ == "__main__":
    X, y = load_data()
    model, acc = train_model(X, y)
    print(f"Model Accuracy: {acc:.4f}",`,
    
    javascript: `// Machine Learning in JavaScript - K-Means Clustering
class KMeansClusterer {
    constructor(k, maxIterations = 100) {
        this.k = k;
        this.maxIterations = maxIterations;
        this.centroids = [];
        this.clusters = [];
    }
    
    // Inefficient distance calculation with nested loops
    euclideanDistance(point1, point2) {
        let sum = 0;
        // Nested loops causing O(n²) complexity
        for (let i = 0; i < point1.length; i++) {
            for (let j = 0; j < point2.length; j++) {
                if (i === j) {
                    sum += Math.pow(point1[i] - point2[j], 2);
                }
            }
        }
        return Math.sqrt(sum);
    }
    
    // Initialize centroids randomly (inefficient way)
    initializeCentroids(data) {
        this.centroids = [];
        // Inefficient random selection with potential duplicates
        for (let i = 0; i < this.k; i++) {
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * data.length);
            } while (this.centroids.some(centroid => 
                JSON.stringify(centroid) === JSON.stringify(data[randomIndex])
            ));
            this.centroids.push([...data[randomIndex]]);
        }
    }
    
    // Assign points to clusters (inefficient)
    assignPointsToClusters(data) {
        this.clusters = Array(this.k).fill().map(() => []);
        
        // Nested loops for cluster assignment
        for (let i = 0; i < data.length; i++) {
            let minDistance = Infinity;
            let closestCentroid = 0;
            
            for (let j = 0; j < this.centroids.length; j++) {
                // Redundant distance calculations
                let distance1 = this.euclideanDistance(data[i], this.centroids[j]);
                let distance2 = this.euclideanDistance(data[i], this.centroids[j]); // Duplicate
                let distance = Math.min(distance1, distance2);
                
                if (distance < minDistance) {
                    minDistance = distance;
                    closestCentroid = j;
                }
            }
            
            this.clusters[closestCentroid].push(data[i]);
        }
    }
    
    // Update centroids with synchronous operations
    updateCentroids() {
        for (let i = 0; i < this.k; i++) {
            if (this.clusters[i].length > 0) {
                let newCentroid = new Array(this.clusters[i][0].length).fill(0);
                
                // Inefficient centroid calculation
                for (let j = 0; j < this.clusters[i].length; j++) {
                    for (let k = 0; k < newCentroid.length; k++) {
                        newCentroid[k] += this.clusters[i][j][k];
                    }
                }
                
                for (let k = 0; k < newCentroid.length; k++) {
                    newCentroid[k] /= this.clusters[i].length;
                }
                
                this.centroids[i] = newCentroid;
            }
        }
    }
    
    // Main clustering function
    fit(data) {
        this.initializeCentroids(data);
        
        for (let iteration = 0; iteration < this.maxIterations; iteration++) {
            this.assignPointsToClusters(data);
            this.updateCentroids();
        }
        
        return this.clusters;
    }
}

// Generate sample data inefficiently
function generateSampleData(numPoints = 100) {
    const data = [];
    // Inefficient data generation with nested operations
    for (let i = 0; i < numPoints; i++) {
        let point = [];
        for (let j = 0; j < 2; j++) {
            // Redundant calculations
            let value = Math.random() * 100;
            let processedValue = value;
            for (let k = 0; k < 10; k++) {
                processedValue = Math.sin(processedValue) + Math.cos(value);
            }
            point.push(Math.random() * 100); // Ignore processed value (wasteful)
        }
        data.push(point);
    }
    return data;
}

// Usage
const data = generateSampleData(200);
const kmeans = new KMeansClusterer(3);
const clusters = kmeans.fit(data);
console.log("Clustering completed with", clusters.length, "clusters");`
  };

  const handleAnalyze = async () => {
    if (!code.trim()) {
      toast.error("Please enter some code to analyze");
      return;
    }
    if (!user) {
      toast.error("Please log in to analyze code");
      return;
    }
    await analyzeCode(code, language);
  };

  const loadDummyCode = () => {
    const dummyCode = dummyMLCode[language as keyof typeof dummyMLCode] || dummyMLCode.python;
    setCode(dummyCode);
    toast.success("Dummy ML code loaded!");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  if (isAnalyzing) return <LoadingState module="codelens" />;

  return (
    <div className="space-y-6">
      <div className="glass-dark rounded-2xl p-6 animate-scale-in">
        <h2 className="text-2xl font-bold font-sora mb-2 bg-gradient-to-r from-neon-green to-neon-blue bg-clip-text text-transparent">
          🔍 CodeLens
        </h2>
        <p className="text-muted-foreground mb-6">
          Analyze your code for complexity, bottlenecks, and optimization opportunities
        </p>

        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Programming Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full glass rounded-xl px-4 py-3 bg-black/20 border-0 focus:ring-2 focus:ring-neon-green transition-all"
              >
                {languages.map((lang) => (
                  <option key={lang.value} value={lang.value} className="bg-black text-white">
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <Button
                onClick={loadDummyCode}
                variant="outline"
                className="bg-purple-500/10 border-purple-500/30 text-purple-300 hover:bg-purple-500/20"
              >
                <FileCode className="w-4 h-4 mr-2" />
                Load ML Example
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Code Input</label>
            <div className="glass rounded-xl overflow-hidden">
              <Editor
                height="300px"
                language={language}
                value={code}
                onChange={(value) => setCode(value || "")}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: "on",
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </div>
          </div>

          <Button
            onClick={handleAnalyze}
            className="w-full bg-gradient-to-r from-neon-green to-neon-blue rounded-xl py-3 font-semibold hover:scale-105 transition-all duration-300"
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Analyzing Code...
              </>
            ) : (
              "Analyze Code"
            )}
          </Button>
        </div>
      </div>

      {analysis && (
        <div className="grid gap-4">
          <OutputCard
            title="Complexity Analysis"
            tag="Big-O"
            tagColor="bg-neon-blue"
            content={
              <div className="space-y-3">
                <div className="font-mono text-sm bg-black/30 p-3 rounded-lg">
                  {analysis.complexity || "Analysis not available"}
                </div>
              </div>
            }
            delay={100}
          />

          {analysis.bottlenecks && analysis.bottlenecks.length > 0 && (
            <OutputCard
              title="Performance Bottlenecks"
              tag="Issues Found"
              tagColor="bg-yellow-500"
              content={
                <div className="space-y-2">
                  {analysis.bottlenecks.map((bottleneck, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-sm">{bottleneck}</span>
                    </div>
                  ))}
                </div>
              }
              delay={200}
            />
          )}

          {analysis.suggestions && (
            <OutputCard
              title="Optimization Suggestions"
              tag="Improvements"
              tagColor="bg-neon-purple"
              content={
                <div className="space-y-3">
                  <p className="text-sm leading-relaxed">{analysis.suggestions}</p>
                </div>
              }
              delay={300}
            />
          )}

          {analysis.optimizedCode && (
            <OutputCard
              title="Optimized Code"
              tag="Enhanced"
              tagColor="bg-neon-green"
              content={
                <div className="space-y-3">
                  <div className="bg-black/30 rounded-lg overflow-hidden">
                    <Editor
                      height="250px"
                      language={language}
                      value={analysis.optimizedCode}
                      theme="vs-dark"
                      options={{
                        readOnly: true,
                        minimap: { enabled: false },
                        fontSize: 12,
                        lineNumbers: "on",
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                      }}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(analysis.optimizedCode || "")}
                      className="flex items-center gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      Copy Code
                    </Button>
                  </div>
                </div>
              }
              delay={400}
            />
          )}

          {analysis.explanation && (
            <OutputCard
              title="AI Explanation"
              tag="How it Works"
              tagColor="bg-neon-orange"
              content={
                <div className="space-y-3">
                  <p className="text-sm leading-relaxed">{analysis.explanation}</p>
                </div>
              }
              delay={500}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default CodeLens;
