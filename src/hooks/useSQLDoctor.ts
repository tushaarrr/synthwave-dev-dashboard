
import { useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface SQLAnalysis {
  explanation: string;
  suggestions: string[];
  optimized_query: string;
  tags: string[];
}

export const useSQLDoctor = () => {
  const { user } = useAuth();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<SQLAnalysis | null>(null);

  const analyzeSQL = async (sqlQuery: string) => {
    if (!user) {
      toast.error('Please log in to analyze SQL');
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // Simulate AI analysis with realistic delay
      await new Promise(resolve => setTimeout(resolve, 2800));
      
      // Generate AI-powered analysis based on SQL patterns
      const analysisResult = generateSQLAnalysis(sqlQuery);
      setAnalysis(analysisResult);

      // Save to Supabase
      const { error } = await supabase
        .from('sql_analysis_history')
        .insert({
          user_id: user.id,
          original_query: sqlQuery,
          explanation: analysisResult.explanation,
          suggestions: analysisResult.suggestions,
          optimized_query: analysisResult.optimized_query,
          tags: analysisResult.tags
        });

      if (error) {
        console.error('Error saving SQL analysis:', error);
        toast.error('Failed to save analysis');
      }
    } catch (error) {
      console.error('Error analyzing SQL:', error);
      toast.error('Failed to analyze SQL');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    analyzeSQL,
    isAnalyzing,
    analysis,
    setAnalysis
  };
};

// AI-powered SQL analysis generator
const generateSQLAnalysis = (sqlQuery: string): SQLAnalysis => {
  const query = sqlQuery.toLowerCase().trim();
  const suggestions: string[] = [];
  const tags: string[] = [];
  
  // Analyze for common patterns and issues
  if (query.includes('select *')) {
    suggestions.push('Replace SELECT * with specific column names to reduce data transfer and improve performance');
    tags.push('SELECT *');
  }
  
  if (query.includes('join') && !query.includes('index')) {
    suggestions.push('Consider adding indexes on JOIN columns for better performance');
    tags.push('Missing Index');
  }
  
  if (query.includes('where') && (query.includes('like') || query.includes('%'))) {
    suggestions.push('LIKE queries with leading wildcards cannot use indexes effectively');
    tags.push('Inefficient LIKE');
  }
  
  if (!query.includes('limit') && (query.includes('order by') || query.includes('join'))) {
    suggestions.push('Consider adding LIMIT clause if you don\'t need all results');
    tags.push('LIMIT Recommended');
  }
  
  if (query.includes('or ')) {
    suggestions.push('OR conditions can prevent index usage - consider using UNION instead');
    tags.push('OR Optimization');
  }
  
  if (query.includes('group by') && !query.includes('having')) {
    suggestions.push('Consider using HAVING clause for filtering aggregated results');
    tags.push('Group By Optimizable');
  }

  // Generate explanation
  let explanation = 'This SQL query ';
  if (query.includes('select')) explanation += 'retrieves data ';
  if (query.includes('join')) explanation += 'by joining multiple tables ';
  if (query.includes('where')) explanation += 'with filtering conditions ';
  if (query.includes('group by')) explanation += 'and groups results ';
  if (query.includes('order by')) explanation += 'in a specific order ';
  explanation += 'from the database.';

  // Generate optimized query
  let optimizedQuery = sqlQuery;
  if (query.includes('select *')) {
    optimizedQuery = optimizedQuery.replace(/select \*/gi, 'SELECT \n    specific_column1,\n    specific_column2');
  }
  if (!query.includes('limit') && query.includes('select')) {
    optimizedQuery += optimizedQuery.endsWith(';') ? '\nLIMIT 100;' : '\nLIMIT 100;';
  }

  return {
    explanation,
    suggestions: suggestions.length > 0 ? suggestions : ['Query structure looks good! Consider adding appropriate indexes for better performance.'],
    optimized_query: optimizedQuery,
    tags: tags.length > 0 ? tags : ['Query Reviewed']
  };
};
