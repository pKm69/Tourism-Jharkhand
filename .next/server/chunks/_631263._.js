module.exports = {

"[project]/lib/ai-services.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

// Advanced AI Services for Tourism Jharkhand
// Integrates multiple AI APIs for comprehensive analysis
__turbopack_esm__({
    "AdvancedAIService": ()=>AdvancedAIService,
    "aiService": ()=>aiService
});
class AdvancedAIService {
    huggingFaceKey;
    openAIKey;
    googleCloudKey;
    constructor(){
        this.huggingFaceKey = process.env.HUGGINGFACE_API_KEY || '';
        this.openAIKey = process.env.OPENAI_API_KEY;
        this.googleCloudKey = process.env.GOOGLE_CLOUD_API_KEY;
    }
    // Enhanced text analysis with multiple AI models
    async analyzeText(text, language = 'auto') {
        try {
            // Detect language if not specified
            const detectedLanguage = language === 'auto' ? await this.detectLanguage(text) : language;
            // Run multiple AI analyses in parallel
            const [sentimentResult, emotionResult, toxicityResult, categoryResult] = await Promise.allSettled([
                this.analyzeSentiment(text, detectedLanguage),
                this.analyzeEmotions(text),
                this.analyzeToxicity(text),
                this.categorizeText(text)
            ]);
            // Extract keywords using advanced NLP
            const keywords = await this.extractAdvancedKeywords(text, detectedLanguage);
            // Generate actionable insights
            const insights = await this.generateActionableInsights(text, detectedLanguage);
            // Determine urgency level
            const urgency = this.calculateUrgency(sentimentResult.status === 'fulfilled' ? sentimentResult.value : null, toxicityResult.status === 'fulfilled' ? toxicityResult.value : 0);
            return {
                sentiment: sentimentResult.status === 'fulfilled' ? sentimentResult.value.sentiment : 'neutral',
                confidence: sentimentResult.status === 'fulfilled' ? sentimentResult.value.confidence : 0.5,
                emotions: emotionResult.status === 'fulfilled' ? emotionResult.value : {},
                keywords,
                language: detectedLanguage,
                toxicity: toxicityResult.status === 'fulfilled' ? toxicityResult.value : 0,
                urgency,
                categories: categoryResult.status === 'fulfilled' ? categoryResult.value : [],
                actionableInsights: insights
            };
        } catch (error) {
            console.error('Advanced AI analysis failed:', error);
            return this.fallbackAnalysis(text, language);
        }
    }
    // Voice analysis with speech-to-text and emotion detection
    async analyzeVoice(audioBlob) {
        try {
            // Convert audio to text using Hugging Face Whisper
            const transcription = await this.speechToText(audioBlob);
            // Analyze the transcribed text
            const textAnalysis = await this.analyzeText(transcription);
            // Analyze voice tone and emotions from audio
            const voiceEmotions = await this.analyzeVoiceEmotions(audioBlob);
            return {
                transcription,
                sentiment: textAnalysis.sentiment,
                confidence: textAnalysis.confidence,
                emotions: {
                    ...textAnalysis.emotions,
                    ...voiceEmotions
                },
                speakerTone: this.determineSpeakerTone(voiceEmotions),
                language: textAnalysis.language
            };
        } catch (error) {
            console.error('Voice analysis failed:', error);
            throw new Error('Voice analysis service unavailable');
        }
    }
    // Image analysis for visual feedback
    async analyzeImage(imageBlob) {
        try {
            // Convert image to base64
            const base64Image = await this.blobToBase64(imageBlob);
            // Analyze image content using Hugging Face Vision models
            const [description, objects, sentiment] = await Promise.all([
                this.generateImageDescription(base64Image),
                this.detectObjects(base64Image),
                this.analyzeImageSentiment(base64Image)
            ]);
            // Assess image quality
            const quality = await this.assessImageQuality(base64Image);
            // Detect potential issues
            const issues = await this.detectImageIssues(base64Image, objects);
            return {
                description,
                objects,
                sentiment,
                quality,
                issues,
                location: await this.extractLocationFromImage(base64Image)
            };
        } catch (error) {
            console.error('Image analysis failed:', error);
            throw new Error('Image analysis service unavailable');
        }
    }
    // Language detection using AI
    async detectLanguage(text) {
        try {
            const response = await fetch('https://api-inference.huggingface.co/models/facebook/fasttext-language-identification', {
                headers: {
                    'Authorization': `Bearer ${this.huggingFaceKey}`,
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    inputs: text
                })
            });
            if (response.ok) {
                const result = await response.json();
                return result[0]?.label?.replace('__label__', '') || 'en';
            }
        } catch (error) {
            console.error('Language detection failed:', error);
        }
        return 'en';
    }
    // Enhanced sentiment analysis with multiple models
    async analyzeSentiment(text, language) {
        const models = [
            'cardiffnlp/twitter-roberta-base-sentiment-latest',
            'nlptown/bert-base-multilingual-uncased-sentiment'
        ];
        for (const model of models){
            try {
                const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
                    headers: {
                        'Authorization': `Bearer ${this.huggingFaceKey}`,
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        inputs: text
                    })
                });
                if (response.ok) {
                    const result = await response.json();
                    if (Array.isArray(result) && result.length > 0) {
                        const topResult = result[0];
                        return {
                            sentiment: this.normalizeSentiment(topResult.label),
                            confidence: topResult.score
                        };
                    }
                }
            } catch (error) {
                console.error(`Sentiment analysis with ${model} failed:`, error);
            }
        }
        throw new Error('All sentiment analysis models failed');
    }
    // Advanced emotion analysis
    async analyzeEmotions(text) {
        try {
            const response = await fetch('https://api-inference.huggingface.co/models/j-hartmann/emotion-english-distilroberta-base', {
                headers: {
                    'Authorization': `Bearer ${this.huggingFaceKey}`,
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    inputs: text
                })
            });
            if (response.ok) {
                const emotions = await response.json();
                if (Array.isArray(emotions) && emotions.length > 0) {
                    const emotionScores = {};
                    emotions[0].forEach((emotion)=>{
                        emotionScores[emotion.label.toLowerCase()] = emotion.score;
                    });
                    return emotionScores;
                }
            }
        } catch (error) {
            console.error('Emotion analysis failed:', error);
        }
        return {};
    }
    // Toxicity detection
    async analyzeToxicity(text) {
        try {
            const response = await fetch('https://api-inference.huggingface.co/models/unitary/toxic-bert', {
                headers: {
                    'Authorization': `Bearer ${this.huggingFaceKey}`,
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    inputs: text
                })
            });
            if (response.ok) {
                const result = await response.json();
                if (Array.isArray(result) && result.length > 0) {
                    const toxicResult = result[0].find((r)=>r.label === 'TOXIC');
                    return toxicResult ? toxicResult.score : 0;
                }
            }
        } catch (error) {
            console.error('Toxicity analysis failed:', error);
        }
        return 0;
    }
    // Text categorization
    async categorizeText(text) {
        try {
            const response = await fetch('https://api-inference.huggingface.co/models/facebook/bart-large-mnli', {
                headers: {
                    'Authorization': `Bearer ${this.huggingFaceKey}`,
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    inputs: text,
                    parameters: {
                        candidate_labels: [
                            'accommodation',
                            'food',
                            'transportation',
                            'attractions',
                            'service quality',
                            'cleanliness',
                            'safety',
                            'pricing',
                            'accessibility',
                            'cultural experience'
                        ]
                    }
                })
            });
            if (response.ok) {
                const result = await response.json();
                return result.labels?.slice(0, 3) || [];
            }
        } catch (error) {
            console.error('Text categorization failed:', error);
        }
        return [];
    }
    // Advanced keyword extraction using TF-IDF and NER
    async extractAdvancedKeywords(text, language) {
        try {
            // Named Entity Recognition
            const response = await fetch('https://api-inference.huggingface.co/models/dbmdz/bert-large-cased-finetuned-conll03-english', {
                headers: {
                    'Authorization': `Bearer ${this.huggingFaceKey}`,
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    inputs: text
                })
            });
            const entities = [];
            if (response.ok) {
                const result = await response.json();
                if (Array.isArray(result)) {
                    result.forEach((entity)=>{
                        if (entity.entity_group && entity.word) {
                            entities.push(entity.word.replace('##', ''));
                        }
                    });
                }
            }
            // Combine with TF-IDF keywords
            const tfidfKeywords = this.extractTFIDFKeywords(text);
            return [
                ...new Set([
                    ...entities,
                    ...tfidfKeywords
                ])
            ].slice(0, 10);
        } catch (error) {
            console.error('Advanced keyword extraction failed:', error);
            return this.extractTFIDFKeywords(text);
        }
    }
    // Generate actionable insights using AI
    async generateActionableInsights(text, language) {
        const insights = [];
        // Rule-based insights for now (can be enhanced with GPT-4 later)
        const lowercaseText = text.toLowerCase();
        if (lowercaseText.includes('dirty') || lowercaseText.includes('unclean')) {
            insights.push('Immediate cleaning and hygiene improvement required');
        }
        if (lowercaseText.includes('expensive') || lowercaseText.includes('overpriced')) {
            insights.push('Review pricing strategy and provide value justification');
        }
        if (lowercaseText.includes('rude') || lowercaseText.includes('unprofessional')) {
            insights.push('Staff training and customer service improvement needed');
        }
        if (lowercaseText.includes('unsafe') || lowercaseText.includes('dangerous')) {
            insights.push('URGENT: Safety assessment and security measures required');
        }
        if (lowercaseText.includes('beautiful') || lowercaseText.includes('amazing')) {
            insights.push('Leverage positive aspects in marketing and promotion');
        }
        return insights;
    }
    // Calculate urgency level
    calculateUrgency(sentiment, toxicity) {
        if (toxicity > 0.8 || sentiment?.sentiment === 'negative' && sentiment?.confidence > 0.9) {
            return 'critical';
        }
        if (toxicity > 0.6 || sentiment?.sentiment === 'negative' && sentiment?.confidence > 0.7) {
            return 'high';
        }
        if (toxicity > 0.3 || sentiment?.sentiment === 'negative' && sentiment?.confidence > 0.5) {
            return 'medium';
        }
        return 'low';
    }
    // Speech to text conversion
    async speechToText(audioBlob) {
        try {
            const formData = new FormData();
            formData.append('file', audioBlob, 'audio.wav');
            const response = await fetch('https://api-inference.huggingface.co/models/openai/whisper-large-v3', {
                headers: {
                    'Authorization': `Bearer ${this.huggingFaceKey}`
                },
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                const result = await response.json();
                return result.text || '';
            }
        } catch (error) {
            console.error('Speech to text failed:', error);
        }
        return '';
    }
    // Voice emotion analysis
    async analyzeVoiceEmotions(audioBlob) {
        // Placeholder for voice emotion analysis
        // In production, this would use specialized audio emotion recognition models
        return {
            calm: 0.3,
            excited: 0.2,
            frustrated: 0.1,
            happy: 0.4
        };
    }
    // Determine speaker tone from voice emotions
    determineSpeakerTone(emotions) {
        const maxEmotion = Object.entries(emotions).reduce((a, b)=>a[1] > b[1] ? a : b);
        return maxEmotion[0] || 'calm';
    }
    // Image description generation
    async generateImageDescription(base64Image) {
        try {
            const response = await fetch('https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large', {
                headers: {
                    'Authorization': `Bearer ${this.huggingFaceKey}`,
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    inputs: base64Image
                })
            });
            if (response.ok) {
                const result = await response.json();
                return result[0]?.generated_text || 'Unable to generate description';
            }
        } catch (error) {
            console.error('Image description failed:', error);
        }
        return 'Image analysis unavailable';
    }
    // Object detection in images
    async detectObjects(base64Image) {
        try {
            const response = await fetch('https://api-inference.huggingface.co/models/facebook/detr-resnet-50', {
                headers: {
                    'Authorization': `Bearer ${this.huggingFaceKey}`,
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    inputs: base64Image
                })
            });
            if (response.ok) {
                const result = await response.json();
                return result.map((obj)=>obj.label).slice(0, 10);
            }
        } catch (error) {
            console.error('Object detection failed:', error);
        }
        return [];
    }
    // Image sentiment analysis
    async analyzeImageSentiment(base64Image) {
        // Placeholder - would use specialized image sentiment models
        return 'neutral';
    }
    // Assess image quality
    async assessImageQuality(base64Image) {
        // Placeholder - would use image quality assessment models
        return Math.random() * 0.3 + 0.7 // Random quality between 0.7-1.0
        ;
    }
    // Detect issues in images
    async detectImageIssues(base64Image, objects) {
        const issues = [];
        // Rule-based issue detection
        if (objects.includes('trash') || objects.includes('garbage')) {
            issues.push('Cleanliness issue detected');
        }
        if (objects.includes('damage') || objects.includes('broken')) {
            issues.push('Infrastructure damage detected');
        }
        return issues;
    }
    // Extract location from image metadata
    async extractLocationFromImage(base64Image) {
        // Placeholder - would extract GPS data from EXIF or use image recognition
        return undefined;
    }
    // Utility functions
    async blobToBase64(blob) {
        return new Promise((resolve, reject)=>{
            const reader = new FileReader();
            reader.onloadend = ()=>resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }
    normalizeSentiment(label) {
        const normalized = label.toLowerCase();
        if (normalized.includes('positive') || normalized.includes('pos')) return 'positive';
        if (normalized.includes('negative') || normalized.includes('neg')) return 'negative';
        return 'neutral';
    }
    extractTFIDFKeywords(text) {
        const stopWords = new Set([
            'the',
            'a',
            'an',
            'and',
            'or',
            'but',
            'in',
            'on',
            'at',
            'to',
            'for',
            'of',
            'with',
            'by',
            'is',
            'was',
            'are',
            'were',
            'be',
            'been',
            'have',
            'has',
            'had',
            'do',
            'does',
            'did',
            'will',
            'would',
            'could',
            'should',
            'may',
            'might',
            'must',
            'can',
            'this',
            'that',
            'these',
            'those',
            'i',
            'you',
            'he',
            'she',
            'it',
            'we',
            'they',
            'me',
            'him',
            'her',
            'us',
            'them'
        ]);
        const words = text.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter((word)=>word.length > 2 && !stopWords.has(word));
        const wordCount = {};
        words.forEach((word)=>{
            wordCount[word] = (wordCount[word] || 0) + 1;
        });
        return Object.entries(wordCount).sort(([, a], [, b])=>b - a).slice(0, 5).map(([word])=>word);
    }
    fallbackAnalysis(text, language) {
        // Simple rule-based fallback
        const positiveWords = [
            'good',
            'great',
            'excellent',
            'amazing',
            'wonderful',
            'beautiful',
            'love',
            'perfect'
        ];
        const negativeWords = [
            'bad',
            'terrible',
            'awful',
            'horrible',
            'hate',
            'worst',
            'disappointing',
            'poor'
        ];
        const words = text.toLowerCase().split(/\s+/);
        const positiveCount = words.filter((word)=>positiveWords.includes(word)).length;
        const negativeCount = words.filter((word)=>negativeWords.includes(word)).length;
        let sentiment = 'neutral';
        let confidence = 0.5;
        if (positiveCount > negativeCount) {
            sentiment = 'positive';
            confidence = Math.min(0.8, 0.5 + (positiveCount - negativeCount) * 0.1);
        } else if (negativeCount > positiveCount) {
            sentiment = 'negative';
            confidence = Math.min(0.8, 0.5 + (negativeCount - positiveCount) * 0.1);
        }
        return {
            sentiment,
            confidence,
            emotions: {
                joy: sentiment === 'positive' ? confidence * 0.8 : 0.1,
                anger: sentiment === 'negative' ? confidence * 0.6 : 0.1,
                sadness: sentiment === 'negative' ? confidence * 0.4 : 0.1
            },
            keywords: this.extractTFIDFKeywords(text),
            language: language || 'en',
            toxicity: 0,
            urgency: 'low',
            categories: [],
            actionableInsights: []
        };
    }
}
const aiService = new AdvancedAIService();

})()),
"[project]/app/api/feedback/route.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "GET": ()=>GET,
    "POST": ()=>POST,
    "PUT": ()=>PUT
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2d$services$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/lib/ai-services.ts [app-route] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
// Real-time alert system
class AlertSystem {
    static async triggerAlert(feedback) {
        if (feedback.urgencyLevel === 'critical' || feedback.urgencyLevel === 'high') {
            // In production, this would send real notifications
            console.log(`🚨 CRITICAL ALERT: ${feedback.location} - ${feedback.category}`);
            console.log(`Issue: ${feedback.aiAnalysis.actionableInsights?.join(', ')}`);
            // Auto-generate response for critical issues
            feedback.autoResponseGenerated = await this.generateAutoResponse(feedback);
            feedback.escalated = true;
        }
    }
    static async generateAutoResponse(feedback) {
        const insights = feedback.aiAnalysis.actionableInsights || [];
        if (insights.some((i)=>i.includes('URGENT') || i.includes('Safety'))) {
            return `Thank you for bringing this safety concern to our attention. We have immediately escalated this issue to our safety team and will address it within 24 hours. Your safety is our top priority.`;
        }
        if (feedback.aiAnalysis.sentiment === 'negative' && feedback.aiAnalysis.confidence > 0.8) {
            return `We sincerely apologize for your disappointing experience. We have forwarded your feedback to the relevant team for immediate action. We will contact you within 48 hours with an update on the improvements being made.`;
        }
        return `Thank you for your valuable feedback. We appreciate you taking the time to share your experience with us.`;
    }
}
// Advanced AI-powered feedback analysis
async function analyzeAdvancedFeedback(textFeedback, voiceBlob, imageBlob, language = 'auto') {
    try {
        const results = {};
        // Analyze text if provided
        if (textFeedback) {
            results.aiAnalysis = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2d$services$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["aiService"].analyzeText(textFeedback, language);
        }
        // Analyze voice if provided
        if (voiceBlob) {
            results.voiceAnalysis = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2d$services$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["aiService"].analyzeVoice(voiceBlob);
            // If no text feedback, use voice transcription for text analysis
            if (!textFeedback && results.voiceAnalysis.transcription) {
                results.aiAnalysis = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2d$services$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["aiService"].analyzeText(results.voiceAnalysis.transcription, language);
            }
        }
        // Analyze image if provided
        if (imageBlob) {
            results.imageAnalysis = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2d$services$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["aiService"].analyzeImage(imageBlob);
        }
        return results;
    } catch (error) {
        console.error('Advanced feedback analysis failed:', error);
        // Fallback analysis
        if (textFeedback) {
            return {
                aiAnalysis: await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2d$services$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["aiService"].analyzeText(textFeedback, language)
            };
        }
        throw error;
    }
}
// Real-time sentiment monitoring
class SentimentMonitor {
    static sentimentHistory = [];
    static addSentiment(feedback) {
        this.sentimentHistory.push({
            timestamp: feedback.timestamp,
            sentiment: feedback.aiAnalysis.sentiment,
            confidence: feedback.aiAnalysis.confidence,
            location: feedback.location,
            category: feedback.category
        });
        // Keep only last 1000 entries
        if (this.sentimentHistory.length > 1000) {
            this.sentimentHistory = this.sentimentHistory.slice(-1000);
        }
        // Check for sentiment trends
        this.checkSentimentTrends(feedback.location, feedback.category);
    }
    static checkSentimentTrends(location, category) {
        const recentFeedbacks = this.sentimentHistory.filter((s)=>s.location === location && s.category === category).slice(-10) // Last 10 feedbacks for this location/category
        ;
        if (recentFeedbacks.length >= 5) {
            const negativeFeedbacks = recentFeedbacks.filter((s)=>s.sentiment === 'negative');
            if (negativeFeedbacks.length >= 3) {
                console.log(`⚠️ TREND ALERT: Increasing negative sentiment detected for ${location} - ${category}`);
            // In production, this would trigger notifications to tourism officials
            }
        }
    }
    static getSentimentTrends(location, category) {
        let filtered = this.sentimentHistory;
        if (location) {
            filtered = filtered.filter((s)=>s.location === location);
        }
        if (category) {
            filtered = filtered.filter((s)=>s.category === category);
        }
        return filtered.slice(-30) // Last 30 entries
        ;
    }
}
// AI-powered chatbot for instant responses
class FeedbackChatbot {
    static async generateResponse(feedback) {
        const { aiAnalysis, location, category } = feedback;
        // Generate contextual response based on AI analysis
        if (aiAnalysis.urgency === 'critical') {
            return `Thank you for this critical feedback about ${location}. We are immediately addressing the ${aiAnalysis.categories?.join(', ')} issues you've mentioned. A senior official will contact you within 2 hours.`;
        }
        if (aiAnalysis.sentiment === 'positive') {
            return `We're delighted to hear about your positive experience at ${location}! Thank you for highlighting ${aiAnalysis.keywords.slice(0, 3).join(', ')}. We'll share your feedback with our team.`;
        }
        if (aiAnalysis.sentiment === 'negative') {
            const issues = aiAnalysis.actionableInsights?.slice(0, 2).join(' and ') || 'the issues you mentioned';
            return `We sincerely apologize for your experience at ${location}. We're taking immediate action on ${issues}. You can expect an update within 24-48 hours.`;
        }
        return `Thank you for your feedback about ${location}. Your insights about ${category.toLowerCase()} are valuable for improving our tourism services.`;
    }
    static async generateFollowUpQuestions(feedback) {
        const questions = [];
        if (feedback.aiAnalysis.sentiment === 'negative') {
            questions.push('What specific steps would you like to see implemented to improve this experience?');
            questions.push('Would you be willing to revisit this location if improvements were made?');
        }
        if (feedback.aiAnalysis.categories?.includes('service quality')) {
            questions.push('Can you provide more details about the staff interaction?');
        }
        if (feedback.aiAnalysis.categories?.includes('cleanliness')) {
            questions.push('Which specific areas need attention regarding cleanliness?');
        }
        return questions.slice(0, 3);
    }
}
// Fallback rule-based sentiment analysis
function fallbackSentimentAnalysis(text, language) {
    const positiveWords = [
        'good',
        'great',
        'excellent',
        'amazing',
        'wonderful',
        'beautiful',
        'love',
        'perfect',
        'awesome',
        'fantastic'
    ];
    const negativeWords = [
        'bad',
        'terrible',
        'awful',
        'horrible',
        'hate',
        'worst',
        'disappointing',
        'poor',
        'dirty',
        'unsafe'
    ];
    // Hindi positive/negative words
    const hindiPositive = [
        'अच्छा',
        'बहुत',
        'सुंदर',
        'खुश',
        'प्रसन्न',
        'उत्कृष्ट'
    ];
    const hindiNegative = [
        'बुरा',
        'गंदा',
        'खराब',
        'दुखी',
        'निराश'
    ];
    const words = text.toLowerCase().split(/\s+/);
    let positiveCount = 0;
    let negativeCount = 0;
    let keywords = [];
    words.forEach((word)=>{
        if (positiveWords.includes(word) || hindiPositive.includes(word)) {
            positiveCount++;
            keywords.push(word);
        }
        if (negativeWords.includes(word) || hindiNegative.includes(word)) {
            negativeCount++;
            keywords.push(word);
        }
    });
    let sentiment = 'neutral';
    let confidence = 0.5;
    if (positiveCount > negativeCount) {
        sentiment = 'positive';
        confidence = Math.min(0.9, 0.5 + (positiveCount - negativeCount) * 0.1);
    } else if (negativeCount > positiveCount) {
        sentiment = 'negative';
        confidence = Math.min(0.9, 0.5 + (negativeCount - positiveCount) * 0.1);
    }
    const emotions = {
        joy: sentiment === 'positive' ? confidence * 0.8 : 0.1,
        anger: sentiment === 'negative' ? confidence * 0.6 : 0.1,
        sadness: sentiment === 'negative' ? confidence * 0.4 : 0.1,
        surprise: 0.2,
        fear: sentiment === 'negative' ? confidence * 0.3 : 0.05,
        disgust: sentiment === 'negative' ? confidence * 0.2 : 0.05
    };
    return {
        sentiment,
        confidence,
        emotions,
        keywords: keywords.slice(0, 5)
    };
}
// Enhanced feedback database with AI analysis
let feedbacks = [];
async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const location = searchParams.get('location');
        const category = searchParams.get('category');
        const sentiment = searchParams.get('sentiment');
        const flagged = searchParams.get('flagged');
        const urgency = searchParams.get('urgency');
        const limit = parseInt(searchParams.get('limit') || '50');
        const offset = parseInt(searchParams.get('offset') || '0');
        let filteredFeedbacks = [
            ...feedbacks
        ];
        if (location && location !== 'All') {
            filteredFeedbacks = filteredFeedbacks.filter((f)=>f.location === location);
        }
        if (category && category !== 'All') {
            filteredFeedbacks = filteredFeedbacks.filter((f)=>f.category === category);
        }
        if (sentiment && sentiment !== 'All') {
            filteredFeedbacks = filteredFeedbacks.filter((f)=>f.aiAnalysis.sentiment === sentiment);
        }
        if (flagged === 'true') {
            filteredFeedbacks = filteredFeedbacks.filter((f)=>f.flagged);
        }
        if (urgency && urgency !== 'All') {
            filteredFeedbacks = filteredFeedbacks.filter((f)=>f.urgencyLevel === urgency);
        }
        // Sort by timestamp (newest first)
        filteredFeedbacks.sort((a, b)=>new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        const paginatedFeedbacks = filteredFeedbacks.slice(offset, offset + limit);
        // Calculate sentiment statistics
        const sentimentStats = {
            positive: filteredFeedbacks.filter((f)=>f.aiAnalysis.sentiment === 'positive').length,
            negative: filteredFeedbacks.filter((f)=>f.aiAnalysis.sentiment === 'negative').length,
            neutral: filteredFeedbacks.filter((f)=>f.aiAnalysis.sentiment === 'neutral').length,
            total: filteredFeedbacks.length
        };
        // Calculate urgency statistics
        const urgencyStats = {
            critical: filteredFeedbacks.filter((f)=>f.urgencyLevel === 'critical').length,
            high: filteredFeedbacks.filter((f)=>f.urgencyLevel === 'high').length,
            medium: filteredFeedbacks.filter((f)=>f.urgencyLevel === 'medium').length,
            low: filteredFeedbacks.filter((f)=>f.urgencyLevel === 'low').length
        };
        // Get sentiment trends
        const sentimentTrends = SentimentMonitor.getSentimentTrends(location || undefined, category || undefined);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            feedbacks: paginatedFeedbacks,
            total: filteredFeedbacks.length,
            sentimentStats,
            urgencyStats,
            sentimentTrends,
            hasMore: offset + limit < filteredFeedbacks.length
        });
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to fetch feedback'
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        const body = await request.json();
        const { userId, userName, location, category, rating, textFeedback, language = 'auto', voiceData, imageData, emojiRating } = body;
        // Advanced AI analysis
        let aiAnalysis;
        let voiceAnalysis;
        let imageAnalysis;
        try {
            // Convert base64 data to blobs if provided
            const voiceBlob = voiceData ? new Blob([
                Buffer.from(voiceData, 'base64')
            ], {
                type: 'audio/wav'
            }) : undefined;
            const imageBlob = imageData ? new Blob([
                Buffer.from(imageData, 'base64')
            ], {
                type: 'image/jpeg'
            }) : undefined;
            const analysisResults = await analyzeAdvancedFeedback(textFeedback, voiceBlob, imageBlob, language);
            aiAnalysis = analysisResults.aiAnalysis;
            voiceAnalysis = analysisResults.voiceAnalysis;
            imageAnalysis = analysisResults.imageAnalysis;
        } catch (error) {
            console.error('AI analysis failed, using fallback:', error);
            // Fallback to basic analysis
            aiAnalysis = {
                sentiment: 'neutral',
                confidence: 0.5,
                emotions: {},
                keywords: [],
                language: language || 'en',
                toxicity: 0,
                urgency: 'low',
                categories: [],
                actionableInsights: []
            };
        }
        // Determine urgency level
        const urgencyLevel = aiAnalysis.urgency || 'low';
        // Check for flagging conditions
        const flagged = aiAnalysis.sentiment === 'negative' && aiAnalysis.confidence > 0.7 || aiAnalysis.toxicity && aiAnalysis.toxicity > 0.5 || urgencyLevel === 'critical' || urgencyLevel === 'high';
        const newFeedback = {
            id: feedbacks.length + 1,
            userId,
            userName,
            location,
            category,
            rating,
            textFeedback,
            language: aiAnalysis.language,
            voiceData,
            imageData,
            emojiRating,
            aiAnalysis,
            voiceAnalysis,
            imageAnalysis,
            timestamp: new Date().toISOString(),
            isVerified: false,
            responseFromVendor: undefined,
            flagged,
            urgencyLevel
        };
        // Generate auto-response using AI chatbot
        try {
            newFeedback.autoResponseGenerated = await FeedbackChatbot.generateResponse(newFeedback);
        } catch (error) {
            console.error('Auto-response generation failed:', error);
        }
        feedbacks.push(newFeedback);
        // Add to sentiment monitoring
        SentimentMonitor.addSentiment(newFeedback);
        // Trigger alerts for critical issues
        await AlertSystem.triggerAlert(newFeedback);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ...newFeedback,
            followUpQuestions: await FeedbackChatbot.generateFollowUpQuestions(newFeedback)
        }, {
            status: 201
        });
    } catch (error) {
        console.error('Failed to submit feedback:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to submit feedback'
        }, {
            status: 500
        });
    }
}
async function PUT(request) {
    try {
        const body = await request.json();
        const { feedbackId, responseFromVendor, flagged } = body;
        const feedbackIndex = feedbacks.findIndex((f)=>f.id === feedbackId);
        if (feedbackIndex === -1) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Feedback not found'
            }, {
                status: 404
            });
        }
        feedbacks[feedbackIndex] = {
            ...feedbacks[feedbackIndex],
            ...responseFromVendor && {
                responseFromVendor
            },
            ...typeof flagged === 'boolean' && {
                flagged
            },
            updatedAt: new Date().toISOString()
        };
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(feedbacks[feedbackIndex]);
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to update feedback'
        }, {
            status: 500
        });
    }
}

})()),

};

//# sourceMappingURL=_631263._.js.map