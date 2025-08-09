// Challenge completion tracking utility
export interface ChallengeProgress {
  challengeId: string;
  completed: boolean;
  completedAt?: Date;
  score?: number;
  timeSpent?: number; // in minutes
}

// In a real app, this would be stored in a database
// For now, we'll use localStorage for persistence
export class ChallengeProgressManager {
  private static STORAGE_KEY = 'lakshya_challenge_progress';

  static getProgress(challengeId: string): ChallengeProgress | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return null;
      
      const allProgress: ChallengeProgress[] = JSON.parse(stored);
      return allProgress.find(p => p.challengeId === challengeId) || null;
    } catch {
      return null;
    }
  }

  static getAllProgress(): ChallengeProgress[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  static markCompleted(challengeId: string, score?: number, timeSpent?: number): void {
    if (typeof window === 'undefined') return;
    
    try {
      const allProgress = this.getAllProgress();
      const existingIndex = allProgress.findIndex(p => p.challengeId === challengeId);
      
      const newProgress: ChallengeProgress = {
        challengeId,
        completed: true,
        completedAt: new Date(),
        score,
        timeSpent
      };

      if (existingIndex >= 0) {
        allProgress[existingIndex] = newProgress;
      } else {
        allProgress.push(newProgress);
      }

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(allProgress));
      
      // Trigger a custom event for UI updates
      window.dispatchEvent(new CustomEvent('challengeCompleted', { 
        detail: { challengeId, score, timeSpent } 
      }));
    } catch (error) {
      console.error('Failed to save challenge progress:', error);
    }
  }

  static getCompletionStats(): {
    totalCompleted: number;
    totalPoints: number;
    averageScore: number;
  } {
    const allProgress = this.getAllProgress();
    const completed = allProgress.filter(p => p.completed);
    
    return {
      totalCompleted: completed.length,
      totalPoints: completed.reduce((sum, p) => sum + (p.score || 0), 0),
      averageScore: completed.length > 0 
        ? completed.reduce((sum, p) => sum + (p.score || 0), 0) / completed.length 
        : 0
    };
  }

  static resetProgress(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
