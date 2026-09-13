// ------------------------------------------------------------------
// Assessment question data
// These arrays are imported by the step components and rendered with
// .map() so every option lives in data - not hardcoded JSX.
// ------------------------------------------------------------------

import {
  Code, Palette, TrendingUp, Brain, Beaker, DollarSign, Scale, Gamepad2,
  Building, Shield, BarChart3, Sparkles, Calculator, Heart, Users,
  Lightbulb, MessageSquare, Users2, FlaskConical, Target, Handshake,
  Lock, Globe
} from 'lucide-react';

export const assessmentQuestions = [
  {
    id: 'about-you',
    title: "Let's start with you",
    subtitle: 'Tell us a little about yourself.',
    educationLevels: ['10th', '11th', '12th', 'College'],
  },
  {
    id: 'academic',
    title: 'Tell us about your academic background',
    subtitle: 'Which stream are you in?',
    streams: ['PCM', 'PCB', 'Commerce', 'Arts', 'Other'],
  },
  {
    id: 'interests',
    title: 'What interests you?',
    subtitle: 'Select all areas that genuinely excite you. Choose at least one.',
    options: [
      { label: 'Technology', description: 'Build software and digital products', icon: Code },
      { label: 'Design', description: 'Create visual and user experiences', icon: Palette },
      { label: 'Business', description: 'Drive growth and strategy', icon: TrendingUp },
      { label: 'Artificial Intelligence', description: 'Work with intelligent systems', icon: Brain },
      { label: 'Biology', description: 'Study living organisms', icon: Beaker },
      { label: 'Finance', description: 'Manage money and investments', icon: DollarSign },
      { label: 'Law', description: 'Work with justice and legal systems', icon: Scale },
      { label: 'Gaming', description: 'Create interactive entertainment', icon: Gamepad2 },
      { label: 'Government Services', description: 'Serve the public sector', icon: Building },
      { label: 'Cyber Security', description: 'Protect digital systems', icon: Shield },
      { label: 'Data Analysis', description: 'Extract insights from data', icon: BarChart3 },
      { label: 'Creative Arts', description: 'Express through art and media', icon: Sparkles },
      { label: 'Mathematics', description: 'Solve problems with numbers', icon: Calculator },
      { label: 'Medicine', description: 'Help improve health and lives', icon: Heart },
      { label: 'Communication', description: 'Connect and influence people', icon: Users },
    ],
  },
  {
    id: 'strengths',
    title: 'What are you good at?',
    subtitle: 'Select your key strengths. Choose at least one.',
    strengths: [
      { label: 'Problem Solving', description: 'Finding creative solutions', icon: Lightbulb },
      { label: 'Programming', description: 'Writing and understanding code', icon: Code },
      { label: 'Communication', description: 'Expressing ideas clearly', icon: MessageSquare },
      { label: 'Creativity', description: 'Thinking outside the box', icon: Palette },
      { label: 'Leadership', description: 'Guiding and inspiring others', icon: Users2 },
      { label: 'Mathematics', description: 'Working with numbers', icon: Calculator },
      { label: 'Research', description: 'Investigating and learning', icon: FlaskConical },
      { label: 'Analytical Thinking', description: 'Breaking down complex problems', icon: Target },
      { label: 'Teamwork', description: 'Collaborating effectively', icon: Handshake },
    ],
    workPreferences: [
      { label: 'Building Things', description: 'Creating tangible products' },
      { label: 'Solving Complex Problems', description: 'Tackling difficult challenges' },
      { label: 'Helping People', description: 'Making a positive impact' },
      { label: 'Creating Content', description: 'Producing media and materials' },
      { label: 'Working With Technology', description: 'Using digital tools' },
      { label: 'Leading Teams', description: 'Managing and directing groups' },
      { label: 'Researching & Discovering', description: 'Exploring new knowledge' },
      { label: 'Working With Data', description: 'Analyzing information' },
    ],
  },
  {
    id: 'goals',
    title: 'What matters most to you?',
    subtitle: 'Select your career priorities. Choose at least one.',
    priorities: [
      { label: 'High Salary', description: 'Financial success', icon: DollarSign },
      { label: 'Work-Life Balance', description: 'Time for personal life', icon: Scale },
      { label: 'Job Security', description: 'Stable employment', icon: Lock },
      { label: 'Creativity', description: 'Express yourself', icon: Sparkles },
      { label: 'Growth Opportunities', description: 'Career advancement', icon: TrendingUp },
      { label: 'Helping People', description: 'Make a difference', icon: Heart },
      { label: 'Innovation', description: 'Work on cutting edge', icon: Lightbulb },
      { label: 'Global Opportunities', description: 'International exposure', icon: Globe },
    ],
    careerGoals: ['Technology', 'Medical', 'Government', 'Business', 'Creative', 'Research', 'Not Sure'],
    exams: ['JEE', 'NEET', 'CUET', 'No Specific Exam', 'Other'],
  },
  {
    id: 'summary',
    title: 'Your profile is ready',
    subtitle: 'Review and find your matches.',
  },
];