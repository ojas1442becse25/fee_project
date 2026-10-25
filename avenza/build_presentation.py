import os
import pptx
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE
from pptx.dml.color import RGBColor

def build_presentation(output_path):
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    # Color Palette (Avenza Design System)
    BG_DARK          = RGBColor(11, 17, 32)      # #0B1120 deep navy
    CARD_BG          = RGBColor(22, 31, 49)      # #161F31 slate card
    CARD_BG_ALT      = RGBColor(28, 40, 62)      # #1C283E slate lighter
    CARD_BORDER      = RGBColor(51, 65, 85)      # #334155 border
    PRIMARY_BLUE     = RGBColor(37, 99, 235)     # #2563EB electric blue
    SECONDARY_PURPLE = RGBColor(124, 58, 237)    # #7C3AED violet
    ACCENT_CYAN      = RGBColor(6, 182, 212)     # #06B6D4 cyan
    SUCCESS_GREEN    = RGBColor(16, 185, 129)    # #10B981 emerald
    WARNING_AMBER    = RGBColor(245, 158, 11)    # #F59E0B amber
    DANGER_RED       = RGBColor(239, 68, 68)     # #EF4444 red
    TEXT_WHITE       = RGBColor(248, 250, 252)   # #F8FAFC white
    TEXT_MUTED       = RGBColor(148, 163, 184)   # #94A3B8 slate-400
    TEXT_DIM         = RGBColor(100, 116, 139)   # #64748B slate-500
    PILL_BG          = RGBColor(30, 41, 59)      # #1E293B

    FONT_FAMILY = "Segoe UI"

    def set_slide_bg(slide):
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
        bg.fill.solid()
        bg.fill.fore_color.rgb = BG_DARK
        bg.line.fill.background()
        return bg

    def add_header(slide, category, title, subtitle):
        # Category Pill
        pill_w = Inches(len(category) * 0.11 + 0.6)
        pill = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(0.45), pill_w, Inches(0.3))
        pill.fill.solid()
        pill.fill.fore_color.rgb = PILL_BG
        pill.line.color.rgb = PRIMARY_BLUE
        pill.line.width = Pt(1)
        tf_p = pill.text_frame
        tf_p.word_wrap = True
        tf_p.margin_left = tf_p.margin_right = Inches(0.1)
        tf_p.margin_top = Inches(0.04)
        p_p = tf_p.paragraphs[0]
        p_p.text = category.upper()
        p_p.font.name = FONT_FAMILY
        p_p.font.size = Pt(9.5)
        p_p.font.bold = True
        p_p.font.color.rgb = ACCENT_CYAN

        # Title & Subtitle text box
        tb = slide.shapes.add_textbox(Inches(0.8), Inches(0.82), Inches(11.733), Inches(0.95))
        tf = tb.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
        
        p_title = tf.paragraphs[0]
        p_title.text = title
        p_title.font.name = FONT_FAMILY
        p_title.font.size = Pt(22)
        p_title.font.bold = True
        p_title.font.color.rgb = TEXT_WHITE
        p_title.space_after = Pt(3)

        p_sub = tf.add_paragraph()
        p_sub.text = subtitle
        p_sub.font.name = FONT_FAMILY
        p_sub.font.size = Pt(11.5)
        p_sub.font.color.rgb = TEXT_MUTED

    def add_card(slide, left, top, width, height, bg_color=CARD_BG, border_color=CARD_BORDER, border_width=1):
        card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
        card.fill.solid()
        card.fill.fore_color.rgb = bg_color
        if border_color:
            card.line.color.rgb = border_color
            card.line.width = Pt(border_width)
        else:
            card.line.fill.background()
        return card

    def set_notes(slide, text):
        slide.notes_slide.notes_text_frame.text = text

    # =========================================================================
    # SLIDE 1: Title Slide
    # =========================================================================
    s1 = prs.slides.add_slide(blank_layout)
    set_slide_bg(s1)

    # Decorative hero backdrop card
    add_card(s1, Inches(0.8), Inches(0.8), Inches(11.733), Inches(5.9), bg_color=RGBColor(16, 24, 40), border_color=PRIMARY_BLUE, border_width=1.5)

    # Top Pill Badge
    pill1 = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.3), Inches(1.2), Inches(3.4), Inches(0.35))
    pill1.fill.solid()
    pill1.fill.fore_color.rgb = PILL_BG
    pill1.line.color.rgb = ACCENT_CYAN
    tf1_p = pill1.text_frame
    p1_p = tf1_p.paragraphs[0]
    p1_p.text = "PROJECT BASED EVALUATION – 1"
    p1_p.font.name = FONT_FAMILY
    p1_p.font.size = Pt(10)
    p1_p.font.bold = True
    p1_p.font.color.rgb = ACCENT_CYAN

    # Title & Subtitle Box
    t_box1 = s1.shapes.add_textbox(Inches(1.3), Inches(1.65), Inches(10.7), Inches(2.0))
    tf1 = t_box1.text_frame
    tf1.word_wrap = True
    p1_title = tf1.paragraphs[0]
    p1_title.text = "AVENZA"
    p1_title.font.name = FONT_FAMILY
    p1_title.font.size = Pt(46)
    p1_title.font.bold = True
    p1_title.font.color.rgb = TEXT_WHITE
    p1_title.space_after = Pt(6)

    p1_sub = tf1.add_paragraph()
    p1_sub.text = "Intelligent Career Discovery & Recommendation Platform"
    p1_sub.font.name = FONT_FAMILY
    p1_sub.font.size = Pt(20)
    p1_sub.font.color.rgb = ACCENT_CYAN
    p1_sub.space_after = Pt(8)

    p1_desc = tf1.add_paragraph()
    p1_desc.text = "A modern frontend Single Page Application (SPA) providing multi-step career assessment, algorithmic profile-to-career matching, and persistent portfolio management."
    p1_desc.font.name = FONT_FAMILY
    p1_desc.font.size = Pt(13)
    p1_desc.font.color.rgb = TEXT_MUTED

    # 3 Feature highlights
    pillars = [
        ("🎯 Multi-Step Assessment", "6 structured stages evaluating education, academic stream, marks, 15+ domain interests, and cognitive strengths."),
        ("⚡ Algorithmic Match Scoring", "Weighted rule engine calculating personalized compatibility scores (0-100%) with transparent rationale."),
        ("📊 User Career Hub", "Dedicated reactive dashboard with saved career bookmarks, profile management, and live career inspiration.")
    ]
    for i, (p_title, p_desc) in enumerate(pillars):
        left_pos = Inches(1.3 + i * 3.65)
        add_card(s1, left_pos, Inches(3.85), Inches(3.45), Inches(1.5), bg_color=CARD_BG, border_color=CARD_BORDER)
        c_box = s1.shapes.add_textbox(left_pos + Inches(0.15), Inches(3.95), Inches(3.15), Inches(1.3))
        c_tf = c_box.text_frame
        c_tf.word_wrap = True
        cp1 = c_tf.paragraphs[0]
        cp1.text = p_title
        cp1.font.name = FONT_FAMILY
        cp1.font.size = Pt(12)
        cp1.font.bold = True
        cp1.font.color.rgb = TEXT_WHITE
        cp1.space_after = Pt(4)
        cp2 = c_tf.add_paragraph()
        cp2.text = p_desc
        cp2.font.name = FONT_FAMILY
        cp2.font.size = Pt(10)
        cp2.font.color.rgb = TEXT_MUTED

    # Meta Footer
    meta_box = s1.shapes.add_textbox(Inches(1.3), Inches(5.6), Inches(10.7), Inches(0.8))
    m_tf = meta_box.text_frame
    m_p = m_tf.paragraphs[0]
    m_p.text = "Presenter: Student Candidate  |  Degree: B.Tech Computer Science & Engineering (FEE)  |  Milestone: Phase 1 (Frontend & Core Logic)"
    m_p.font.name = FONT_FAMILY
    m_p.font.size = Pt(11)
    m_p.font.color.rgb = TEXT_DIM

    set_notes(s1, (
        "Good morning/afternoon respected evaluators. Today I am presenting AVENZA, an intelligent Career Discovery and "
        "Recommendation platform designed to help students discover the most suitable professional paths based on their true academic "
        "strengths and interests. This presentation marks our First Project Based Evaluation. Over the next 15 minutes, I will walk you "
        "through the problem we are addressing, the complete working frontend solution we have engineered in React, its technical architecture, "
        "and our clear roadmap for the upcoming two evaluations."
    ))

    # =========================================================================
    # SLIDE 2: Problem Statement
    # =========================================================================
    s2 = prs.slides.add_slide(blank_layout)
    set_slide_bg(s2)
    add_header(s2, "Context & Opportunity", "The Problem: The Career Confusion Dilemma", 
               "Students face critical career crossroads with fragmented advice, peer pressure, and cognitive overload.")

    problems = [
        ("01", "Information Overload", "Over 300+ modern professional domains exist today, yet high school and college students lack structured filters to explore viable options systematically."),
        ("02", "Self-Aptitude Blindspots", "Students frequently struggle to connect their academic performance and natural cognitive strengths with practical career trajectories."),
        ("03", "External Pressure & Bias", "Significant career decisions are frequently made under peer pressure or societal bias rather than validated aptitude, leading to high college dropout rates."),
        ("04", "Scattered Career Intelligence", "Crucial career parameters such as required skills, entry difficulty, salary expectations, and 5-year growth outlook are scattered across disjointed sites.")
    ]

    for i, (num, title, desc) in enumerate(problems):
        c_left = Inches(0.8 + i * 2.98)
        add_card(s2, c_left, Inches(1.95), Inches(2.82), Inches(3.8), bg_color=CARD_BG, border_color=CARD_BORDER)
        
        # Number badge
        nb = s2.shapes.add_shape(MSO_SHAPE.OVAL, c_left + Inches(0.2), Inches(2.15), Inches(0.55), Inches(0.55))
        nb.fill.solid()
        nb.fill.fore_color.rgb = PILL_BG
        nb.line.color.rgb = DANGER_RED
        nb.line.width = Pt(1.5)
        nb_tf = nb.text_frame
        np = nb_tf.paragraphs[0]
        np.text = num
        np.font.name = FONT_FAMILY
        np.font.size = Pt(12)
        np.font.bold = True
        np.font.color.rgb = DANGER_RED
        np.alignment = PP_ALIGN.CENTER

        tb_prob = s2.shapes.add_textbox(c_left + Inches(0.2), Inches(2.85), Inches(2.42), Inches(2.7))
        tf_prob = tb_prob.text_frame
        tf_prob.word_wrap = True
        p_pt = tf_prob.paragraphs[0]
        p_pt.text = title
        p_pt.font.name = FONT_FAMILY
        p_pt.font.size = Pt(14)
        p_pt.font.bold = True
        p_pt.font.color.rgb = TEXT_WHITE
        p_pt.space_after = Pt(8)

        p_pd = tf_prob.add_paragraph()
        p_pd.text = desc
        p_pd.font.name = FONT_FAMILY
        p_pd.font.size = Pt(11)
        p_pd.font.color.rgb = TEXT_MUTED

    # Bottom statement banner
    add_card(s2, Inches(0.8), Inches(6.0), Inches(11.733), Inches(0.9), bg_color=CARD_BG_ALT, border_color=PRIMARY_BLUE)
    bot_box = s2.shapes.add_textbox(Inches(1.0), Inches(6.1), Inches(11.333), Inches(0.7))
    bot_tf = bot_box.text_frame
    bot_tf.word_wrap = True
    bot_p = bot_tf.paragraphs[0]
    bot_p.text = "💡 Core Insight: Career decisions must be grounded in structured self-awareness and objective data — not confusion, anxiety, and guesswork."
    bot_p.font.name = FONT_FAMILY
    bot_p.font.size = Pt(12.5)
    bot_p.font.bold = True
    bot_p.font.color.rgb = ACCENT_CYAN

    set_notes(s2, (
        "Every year, millions of students reach grade 10, 12, or college without a clear direction. They face four major challenges: "
        "first, massive information overload with hundreds of career paths available; second, a complete lack of tools to assess personal aptitude; "
        "third, high levels of external peer and parental pressure; and fourth, fragmented data where salary, difficulty, and skill requirements are "
        "scattered everywhere. Our core conviction with AVENZA is that career selection must be a structured, data-driven journey of self-discovery."
    ))

    # =========================================================================
    # SLIDE 3: Introducing AVENZA
    # =========================================================================
    s3 = prs.slides.add_slide(blank_layout)
    set_slide_bg(s3)
    add_header(s3, "Solution Overview", "Introducing AVENZA: The Guided Career Pathway", 
               "A progressive student discovery funnel converting raw user aptitude into validated professional recommendations.")

    # 5-Step Process Flow
    steps = [
        ("Step 01", "Student Profile", "Captures educational stage, academic stream, and baseline performance."),
        ("Step 02", "Deep Assessment", "Explores domain interests, cognitive strengths, and career ambitions."),
        ("Step 03", "Profile Analysis", "Normalizes user scores across multiple qualitative & quantitative axes."),
        ("Step 04", "Matching Engine", "Executes weighted scoring rules against curated occupational models."),
        ("Step 05", "Tailored Output", "Generates ranked career matches with transparent rationale and skill tags.")
    ]

    for i, (s_num, s_title, s_desc) in enumerate(steps):
        s_left = Inches(0.8 + i * 2.38)
        card_step = add_card(s3, s_left, Inches(1.95), Inches(2.26), Inches(3.2), bg_color=CARD_BG, border_color=PRIMARY_BLUE if i==3 else CARD_BORDER)
        
        stb = s3.shapes.add_textbox(s_left + Inches(0.12), Inches(2.05), Inches(2.02), Inches(3.0))
        stf = stb.text_frame
        stf.word_wrap = True
        
        sp1 = stf.paragraphs[0]
        sp1.text = s_num
        sp1.font.name = FONT_FAMILY
        sp1.font.size = Pt(10)
        sp1.font.bold = True
        sp1.font.color.rgb = ACCENT_CYAN
        sp1.space_after = Pt(4)

        sp2 = stf.add_paragraph()
        sp2.text = s_title
        sp2.font.name = FONT_FAMILY
        sp2.font.size = Pt(13)
        sp2.font.bold = True
        sp2.font.color.rgb = TEXT_WHITE
        sp2.space_after = Pt(6)

        sp3 = stf.add_paragraph()
        sp3.text = s_desc
        sp3.font.name = FONT_FAMILY
        sp3.font.size = Pt(10.5)
        sp3.font.color.rgb = TEXT_MUTED

    # 3 Value Proposition Cards below
    val_props = [
        ("⭐ Match Score Transparency", "Students see an exact 0-100% compatibility rating plus clear justification explaining why a career fits them."),
        ("📈 360° Career Intelligence", "Detailed occupational profiles including entry difficulty, 5-year growth outlook, salary ranges, and essential skill tags."),
        ("📁 Persistent Career Hub", "User dashboard with career bookmarking, profile editing, and daily career motivation powered by public APIs.")
    ]

    for i, (v_title, v_desc) in enumerate(val_props):
        v_left = Inches(0.8 + i * 3.98)
        add_card(s3, v_left, Inches(5.35), Inches(3.78), Inches(1.6), bg_color=CARD_BG_ALT, border_color=CARD_BORDER)
        v_box = s3.shapes.add_textbox(v_left + Inches(0.15), Inches(5.45), Inches(3.48), Inches(1.4))
        v_tf = v_box.text_frame
        v_tf.word_wrap = True
        vp1 = v_tf.paragraphs[0]
        vp1.text = v_title
        vp1.font.name = FONT_FAMILY
        vp1.font.size = Pt(12)
        vp1.font.bold = True
        vp1.font.color.rgb = SUCCESS_GREEN if i==0 else (ACCENT_CYAN if i==1 else SECONDARY_PURPLE)
        vp1.space_after = Pt(3)
        vp2 = v_tf.add_paragraph()
        vp2.text = v_desc
        vp2.font.name = FONT_FAMILY
        vp2.font.size = Pt(10)
        vp2.font.color.rgb = TEXT_MUTED

    set_notes(s3, (
        "AVENZA solves this dilemma through a structured 5-step funnel. First, the student inputs their baseline education and academic stream. "
        "Second, our interactive assessment captures their interests, cognitive strengths, and long-term goals. Third, the profile is analyzed. "
        "Fourth, our recommendation engine evaluates compatibility against curated career profiles. Finally, the student receives personalized recommendations. "
        "The key differentiators are complete match score transparency, comprehensive 360-degree career intelligence, and a persistent dashboard."
    ))

    # =========================================================================
    # SLIDE 4: Application Overview
    # =========================================================================
    s4 = prs.slides.add_slide(blank_layout)
    set_slide_bg(s4)
    add_header(s4, "Functional Architecture", "Application Overview: Core Page Ecosystem", 
               "A modular Single Page Application built with React Router v6, responsive layouts, and isolated state.")

    modules = [
        ("🏠 Landing Page (Home)", "High-conversion modern dark hero section with animated value props, platform pillars, interactive call-to-actions, and responsive navbar navigation."),
        ("📖 Informational Suite", "Dedicated content hubs including 'About Avenza' mission & story, 'Features' showcase (6 platform pillars), and an interactive Framer Motion FAQ accordion."),
        ("🧭 Career Discovery Engine", "6-stage guided assessment wizard with real-time state lifting, validation gates, controlled inputs, and smooth progress tracking."),
        ("📊 Recommendation Results", "Dynamic career ranking view featuring circular SVG match score rings, category filters, match justifications, and skill breakdown chips."),
        ("🛡️ Protected User Dashboard", "Secured personal workspace housing the Career Journey overview, editable Profile preferences, saved career bookmarks, and daily motivation."),
        ("🔐 Demo Auth & 404 Guard", "Client-side credential hashing, session persistence, automatic user self-registration, route protection, and a custom 404 page.")
    ]

    for i, (m_title, m_desc) in enumerate(modules):
        col = i % 3
        row = i // 3
        m_left = Inches(0.8 + col * 3.98)
        m_top = Inches(1.95 + row * 2.55)
        add_card(s4, m_left, m_top, Inches(3.78), Inches(2.35), bg_color=CARD_BG, border_color=CARD_BORDER)
        
        m_box = s4.shapes.add_textbox(m_left + Inches(0.18), m_top + Inches(0.18), Inches(3.42), Inches(2.0))
        m_tf = m_box.text_frame
        m_tf.word_wrap = True
        mp1 = m_tf.paragraphs[0]
        mp1.text = m_title
        mp1.font.name = FONT_FAMILY
        mp1.font.size = Pt(13)
        mp1.font.bold = True
        mp1.font.color.rgb = ACCENT_CYAN if col==0 else (PRIMARY_BLUE if col==1 else SECONDARY_PURPLE)
        mp1.space_after = Pt(6)

        mp2 = m_tf.add_paragraph()
        mp2.text = m_desc
        mp2.font.name = FONT_FAMILY
        mp2.font.size = Pt(10.5)
        mp2.font.color.rgb = TEXT_MUTED

    set_notes(s4, (
        "Here is the functional overview of our React Single Page Application. It is structured into six core areas: "
        "The Landing page provides an engaging entrance; the Informational suite covers our About page, Features, and an interactive FAQ; "
        "the Career Discovery Engine hosts our 6-step assessment; the Recommendation Results page presents ranked matches; "
        "the User Dashboard gives authenticated students a secure hub; and our Routing layer handles authentication guards and 404 fallbacks."
    ))

    # =========================================================================
    # SLIDE 5: User Journey
    # =========================================================================
    s5 = prs.slides.add_slide(blank_layout)
    set_slide_bg(s5)
    add_header(s5, "User Experience", "End-to-End User Journey Pipeline", 
               "From first discovery on the landing page to actionable long-term portfolio tracking.")

    # 8-step journey pipeline
    journey_steps = [
        ("1", "Landing Page", "Explore value props & click 'Discover Careers'"),
        ("2", "Start Discovery", "Initialize assessment state via custom hook"),
        ("3", "6-Step Wizard", "Provide academics, stream, interests & skills"),
        ("4", "Profile Summary", "Review verified responses before analysis"),
        ("5", "View Results", "Explore ranked matches with match % scores"),
        ("6", "Career Details", "Inspect required skills, salary & growth outlook"),
        ("7", "Save Careers", "Bookmark target careers to localStorage"),
        ("8", "Dashboard Hub", "Track career journey & fetch daily insights")
    ]

    for i, (j_num, j_name, j_sub) in enumerate(journey_steps):
        j_left = Inches(0.8 + i * 1.48)
        j_top = Inches(2.05)
        add_card(s5, j_left, j_top, Inches(1.36), Inches(2.4), bg_color=CARD_BG, border_color=PRIMARY_BLUE if i in [2,4,7] else CARD_BORDER)
        
        j_box = s5.shapes.add_textbox(j_left + Inches(0.08), j_top + Inches(0.1), Inches(1.2), Inches(2.2))
        j_tf = j_box.text_frame
        j_tf.word_wrap = True
        
        jp1 = j_tf.paragraphs[0]
        jp1.text = f"STEP {j_num}"
        jp1.font.name = FONT_FAMILY
        jp1.font.size = Pt(9)
        jp1.font.bold = True
        jp1.font.color.rgb = ACCENT_CYAN
        jp1.space_after = Pt(4)

        jp2 = j_tf.add_paragraph()
        jp2.text = j_name
        jp2.font.name = FONT_FAMILY
        jp2.font.size = Pt(11.5)
        jp2.font.bold = True
        jp2.font.color.rgb = TEXT_WHITE
        jp2.space_after = Pt(4)

        jp3 = j_tf.add_paragraph()
        jp3.text = j_sub
        jp3.font.name = FONT_FAMILY
        jp3.font.size = Pt(9)
        jp3.font.color.rgb = TEXT_MUTED

    # 2 UX Architecture Highlights below
    add_card(s5, Inches(0.8), Inches(4.75), Inches(5.75), Inches(2.1), bg_color=CARD_BG_ALT, border_color=CARD_BORDER)
    u_box1 = s5.shapes.add_textbox(Inches(1.0), Inches(4.9), Inches(5.35), Inches(1.8))
    u_tf1 = u_box1.text_frame
    u_tf1.word_wrap = True
    up1 = u_tf1.paragraphs[0]
    up1.text = "⚡ Frictionless Onboarding Design"
    up1.font.name = FONT_FAMILY
    up1.font.size = Pt(13)
    up1.font.bold = True
    up1.font.color.rgb = ACCENT_CYAN
    up1.space_after = Pt(4)
    up2 = u_tf1.add_paragraph()
    up2.text = "Students are never forced to register or enter credentials prior to taking the assessment. We remove upfront friction so users experience the recommendation value immediately. Auth is only required when saving careers and opening their personal dashboard."
    up2.font.name = FONT_FAMILY
    up2.font.size = Pt(10.5)
    up2.font.color.rgb = TEXT_MUTED

    add_card(s5, Inches(6.78), Inches(4.75), Inches(5.75), Inches(2.1), bg_color=CARD_BG_ALT, border_color=CARD_BORDER)
    u_box2 = s5.shapes.add_textbox(Inches(6.98), Inches(4.9), Inches(5.35), Inches(1.8))
    u_tf2 = u_box2.text_frame
    u_tf2.word_wrap = True
    up3 = u_tf2.paragraphs[0]
    up3.text = "🔄 State & Storage Synchronization"
    up3.font.name = FONT_FAMILY
    up3.font.size = Pt(13)
    up3.font.bold = True
    up3.font.color.rgb = SUCCESS_GREEN
    up3.space_after = Pt(4)
    up4 = u_tf2.add_paragraph()
    up4.text = "Every state change in the assessment seamlessly syncs to browser localStorage via custom hooks. If a student accidentally refreshes or navigates away, their assessment progress and bookmark history are safely restored without data loss."
    up4.font.name = FONT_FAMILY
    up4.font.size = Pt(10.5)
    up4.font.color.rgb = TEXT_MUTED

    set_notes(s5, (
        "This slide illustrates the complete user journey pipeline. The student lands on our homepage, enters the Career Discovery wizard, "
        "and moves through 6 validated steps. Upon submission, they inspect ranked results and dynamic career detail pages. "
        "They can bookmark careers to their dashboard. Notice our key UX decision: zero-barrier onboarding. We let students experience the core value "
        "first without demanding a login upfront. All state is automatically mirrored in localStorage so no progress is ever lost on refresh."
    ))

    # =========================================================================
    # SLIDE 6: Career Assessment Breakdown
    # =========================================================================
    s6 = prs.slides.add_slide(blank_layout)
    set_slide_bg(s6)
    add_header(s6, "Assessment Engine", "The 6-Step Career Discovery Wizard", 
               "Comprehensive data collection ensuring multidimensional profiling across academic, cognitive, and aspirational criteria.")

    assessment_steps = [
        ("Step 1: About You", "Student Identity & Education", "Collects student's preferred name and current educational level (10th, 11th, 12th, or College). Auto-focuses name input on render using useRef.", ["Name Input", "Class Chips (10th-College)", "Auto-focus Ref"]),
        ("Step 2: Academics", "Stream & Performance", "Captures academic stream (PCM, PCB, Commerce, Arts, Other) plus recent academic percentage via synchronized slider & number input.", ["Stream Selection", "Percentage Slider", "Dual Binding"]),
        ("Step 3: Interests", "Curated Domain Affinity", "Presents 15 interactive domain chips (Technology, AI, Design, Business, Medicine, Law, Gaming, etc.). Multi-select state tracking.", ["15 Domain Cards", "Multi-Select State", "Toggle Handlers"]),
        ("Step 4: Strengths", "Abilities & Work Style", "Evaluates 9 core cognitive strengths (Problem Solving, Programming, Creativity, Leadership) and 8 work-style preferences.", ["9 Competencies", "8 Work Style Prefs", "Array State Sync"]),
        ("Step 5: Goals", "Career Ambitions & Exams", "Identifies primary career drivers (High Salary, Work-Life Balance, Growth) and target entrance examinations (JEE, NEET, CUET, None).", ["Priority Cards", "Target Exam Selector", "Career Goal Tag"]),
        ("Step 6: Summary", "Review & Match Trigger", "Consolidates all answers into a clean verification card. Gates submission with full profile validation before launching analysis transition.", ["Profile Overview", "Validation Gate", "Trigger Matcher"])
    ]

    for i, (s_title, s_sub, s_desc, tags) in enumerate(assessment_steps):
        col = i % 3
        row = i // 3
        a_left = Inches(0.8 + col * 3.98)
        a_top = Inches(1.95 + row * 2.55)
        add_card(s6, a_left, a_top, Inches(3.78), Inches(2.35), bg_color=CARD_BG, border_color=CARD_BORDER)
        
        abox = s6.shapes.add_textbox(a_left + Inches(0.18), a_top + Inches(0.15), Inches(3.42), Inches(2.05))
        atf = abox.text_frame
        atf.word_wrap = True
        
        ap1 = atf.paragraphs[0]
        ap1.text = s_title
        ap1.font.name = FONT_FAMILY
        ap1.font.size = Pt(12.5)
        ap1.font.bold = True
        ap1.font.color.rgb = ACCENT_CYAN
        
        ap2 = atf.add_paragraph()
        ap2.text = s_sub
        ap2.font.name = FONT_FAMILY
        ap2.font.size = Pt(10.5)
        ap2.font.bold = True
        ap2.font.color.rgb = TEXT_WHITE
        ap2.space_after = Pt(4)

        ap3 = atf.add_paragraph()
        ap3.text = s_desc
        ap3.font.name = FONT_FAMILY
        ap3.font.size = Pt(9.5)
        ap3.font.color.rgb = TEXT_MUTED
        ap3.space_after = Pt(6)

        ap4 = atf.add_paragraph()
        ap4.text = " • ".join(tags)
        ap4.font.name = FONT_FAMILY
        ap4.font.size = Pt(8.5)
        ap4.font.color.rgb = SECONDARY_PURPLE

    set_notes(s6, (
        "Now let us examine the 6 steps of the assessment wizard in detail. Step 1 collects demographics and education level with auto-focus; "
        "Step 2 captures academic stream and marks using a dual-bound slider and numeric input; Step 3 presents 15 curated domain chips; "
        "Step 4 assesses 9 cognitive abilities and 8 work-style preferences; Step 5 identifies career priorities like salary or work-life balance; "
        "and Step 6 provides an instant summary for verification before triggering the matching engine. Each step enforces strict validation."
    ))

    # =========================================================================
    # SLIDE 7: Interactive Assessment UX & Mockup
    # =========================================================================
    s7 = prs.slides.add_slide(blank_layout)
    set_slide_bg(s7)
    add_header(s7, "Interface Engineering", "Interactive Assessment Experience & UX", 
               "Engineered with controlled React inputs, state validation gates, and responsive UI components.")

    # Left Column: Features
    add_card(s7, Inches(0.8), Inches(1.95), Inches(5.6), Inches(4.9), bg_color=CARD_BG, border_color=CARD_BORDER)
    l_box = s7.shapes.add_textbox(Inches(1.05), Inches(2.15), Inches(5.1), Inches(4.5))
    ltf = l_box.text_frame
    ltf.word_wrap = True

    features_list = [
        ("Dynamic Progress Bar", "Calculates (currentStep / totalSteps * 100)% dynamically, styled with smooth CSS gradient animations."),
        ("Accessible Option Cards", "Custom OptionCard component supporting toggle, selection, and compact variants with aria-pressed accessibility."),
        ("Dual-Bound Academic Slider", "Real-time synchronization between an HTML5 range slider and numeric percentage input with clamped limits (0-100)."),
        ("Validation Gatekeeping", "The Continue button is disabled via canContinue prop until required selections are satisfied in each step."),
        ("Smooth Viewport Anchoring", "useRef anchors ensure automatic smooth scrolling to the top of the question container on step transition.")
    ]

    for title, desc in features_list:
        p_t = ltf.add_paragraph() if ltf.paragraphs[0].text else ltf.paragraphs[0]
        p_t.text = f"✔ {title}"
        p_t.font.name = FONT_FAMILY
        p_t.font.size = Pt(12)
        p_t.font.bold = True
        p_t.font.color.rgb = ACCENT_CYAN
        
        p_d = ltf.add_paragraph()
        p_d.text = desc
        p_d.font.name = FONT_FAMILY
        p_d.font.size = Pt(10)
        p_d.font.color.rgb = TEXT_MUTED
        p_d.space_after = Pt(8)

    # Right Column: UI Mockup Placeholder
    add_card(s7, Inches(6.65), Inches(1.95), Inches(5.88), Inches(4.9), bg_color=CARD_BG_ALT, border_color=PRIMARY_BLUE)
    
    # Mockup header bar
    m_bar = s7.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(6.65), Inches(1.95), Inches(5.88), Inches(0.45))
    m_bar.fill.solid()
    m_bar.fill.fore_color.rgb = PILL_BG
    m_bar.line.color.rgb = CARD_BORDER
    
    m_dots = s7.shapes.add_textbox(Inches(6.8), Inches(1.95), Inches(2.0), Inches(0.4))
    m_dots.text_frame.paragraphs[0].text = "🔴 🟡 🟢   Avenza Career Discovery Wizard"
    m_dots.text_frame.paragraphs[0].font.size = Pt(9.5)
    m_dots.text_frame.paragraphs[0].font.color.rgb = TEXT_MUTED

    # Mockup content box
    mock_box = s7.shapes.add_textbox(Inches(6.9), Inches(2.55), Inches(5.38), Inches(4.1))
    mtf = mock_box.text_frame
    mtf.word_wrap = True
    
    mp1 = mtf.paragraphs[0]
    mp1.text = "Step 2 of 6  •  Academic Background"
    mp1.font.size = Pt(10)
    mp1.font.color.rgb = ACCENT_CYAN
    mp1.space_after = Pt(4)

    mp2 = mtf.add_paragraph()
    mp2.text = "Which academic stream best describes you?"
    mp2.font.size = Pt(13)
    mp2.font.bold = True
    mp2.font.color.rgb = TEXT_WHITE
    mp2.space_after = Pt(12)

    # Stream chips mockup text
    mp3 = mtf.add_paragraph()
    mp3.text = " [ PCM ✓ ]     [ PCB ]     [ Commerce ]     [ Arts ]     [ Other ] "
    mp3.font.size = Pt(11)
    mp3.font.bold = True
    mp3.font.color.rgb = PRIMARY_BLUE
    mp3.space_after = Pt(16)

    mp4 = mtf.add_paragraph()
    mp4.text = "How were your recent academics marks?"
    mp4.font.size = Pt(12)
    mp4.font.bold = True
    mp4.font.color.rgb = TEXT_WHITE
    mp4.space_after = Pt(6)

    mp5 = mtf.add_paragraph()
    mp5.text = " ━━━━━━●━━━━━━━━━━━━   [ 85 % ] "
    mp5.font.size = Pt(12)
    mp5.font.color.rgb = SUCCESS_GREEN
    mp5.space_after = Pt(24)

    mp6 = mtf.add_paragraph()
    mp6.text = " [ ← Back ]                                    [ Continue → ] "
    mp6.font.size = Pt(11)
    mp6.font.bold = True
    mp6.font.color.rgb = ACCENT_CYAN

    set_notes(s7, (
        "Here we highlight the engineering behind our interactive wizard. Every input is a controlled React component. "
        "The progress bar calculates progress dynamically. The stream options are rendered with clean responsive flex layout. "
        "The slider uses two-way data binding with a numeric field, so updating either input updates the shared state. "
        "Finally, the continue button is gated: users cannot proceed to the next step without completing mandatory requirements."
    ))

    # =========================================================================
    # SLIDE 8: Recommendation Engine Logic
    # =========================================================================
    s8 = prs.slides.add_slide(blank_layout)
    set_slide_bg(s8)
    add_header(s8, "Algorithm Architecture", "Career Recommendation System Logic", 
               "Deterministic, multi-criteria compatibility algorithm executing client-side in O(N) evaluation time.")

    # Left Column: Input Factors (Weights)
    add_card(s8, Inches(0.8), Inches(1.95), Inches(5.6), Inches(4.9), bg_color=CARD_BG, border_color=CARD_BORDER)
    in_box = s8.shapes.add_textbox(Inches(1.05), Inches(2.15), Inches(5.1), Inches(4.5))
    itf = in_box.text_frame
    itf.word_wrap = True
    
    ip0 = itf.paragraphs[0]
    ip0.text = "⚖ Weighted Matching Criteria"
    ip0.font.size = Pt(14)
    ip0.font.bold = True
    ip0.font.color.rgb = TEXT_WHITE
    ip0.space_after = Pt(10)

    weights = [
        ("Domain Interests Match (35%)", "Direct intersection between student's selected 15 domain chips and the career's primary interest category."),
        ("Academic Stream Alignment (25%)", "Verification of stream prerequisites (e.g. Science/PCM required for Engineering, PCB for Medicine)."),
        ("Cognitive Strengths Fit (20%)", "Evaluates shared competencies between user-selected strengths and mandatory career skill profiles."),
        ("Academic Performance Index (10%)", "Calibrates career entrance difficulty rating against student's reported academic marks percentage."),
        ("Career Priorities & Ambitions (10%)", "Correlates student drivers (High Salary, Work-Life Balance, Growth) with career job characteristics.")
    ]

    for w_title, w_desc in weights:
        wp_t = itf.add_paragraph()
        wp_t.text = f"• {w_title}"
        wp_t.font.size = Pt(11)
        wp_t.font.bold = True
        wp_t.font.color.rgb = ACCENT_CYAN
        wp_d = itf.add_paragraph()
        wp_d.text = w_desc
        wp_d.font.size = Pt(9.5)
        wp_d.font.color.rgb = TEXT_MUTED
        wp_d.space_after = Pt(6)

    # Right Column: Algorithmic Pipeline Box
    add_card(s8, Inches(6.65), Inches(1.95), Inches(5.88), Inches(4.9), bg_color=CARD_BG_ALT, border_color=PRIMARY_BLUE)
    alg_box = s8.shapes.add_textbox(Inches(6.9), Inches(2.15), Inches(5.38), Inches(4.5))
    atf = alg_box.text_frame
    atf.word_wrap = True

    ap0 = atf.paragraphs[0]
    ap0.text = "⚙ Calculation Pipeline (careerMatcher.js)"
    ap0.font.size = Pt(14)
    ap0.font.bold = True
    ap0.font.color.rgb = SUCCESS_GREEN
    ap0.space_after = Pt(12)

    flow_steps = [
        ("1. Profile Ingestion", "Reads verified responses from useCareerAssessment state object."),
        ("2. Catalog Iteration", "Iterates through curated dataset of multi-disciplinary careers."),
        ("3. Weighted Scoring", "Computes affinity points across interests, stream, skills, and marks."),
        ("4. Score Normalization", "Clamps compatibility rating to a standardized 0% – 100% scale."),
        ("5. Rationale Generation", "Generates custom personalized justification string for each match."),
        ("6. Ranked Sorting", "Sorts career catalog descending by match score and returns results.")
    ]

    for step_t, step_d in flow_steps:
        sp_t = atf.add_paragraph()
        sp_t.text = step_t
        sp_t.font.size = Pt(11)
        sp_t.font.bold = True
        sp_t.font.color.rgb = TEXT_WHITE
        sp_d = atf.add_paragraph()
        sp_d.text = step_d
        sp_d.font.size = Pt(9.5)
        sp_d.font.color.rgb = TEXT_MUTED
        sp_d.space_after = Pt(4)

    set_notes(s8, (
        "On this slide we show our recommendation logic implemented in careerMatcher.js. It is a deterministic, weighted scoring algorithm. "
        "Domain interests carry 35% weight; academic stream alignment carries 25%; cognitive strengths carry 20%; academic marks carry 10%; "
        "and career priorities carry 10%. The algorithm iterates through our catalog, normalizes scores from 0 to 100%, generates a personalized justification, "
        "and sorts the output descending. This ensures transparent recommendations without any black-box mystery."
    ))

    # =========================================================================
    # SLIDE 9: Career Results Breakdown
    # =========================================================================
    s9 = prs.slides.add_slide(blank_layout)
    set_slide_bg(s9)
    add_header(s9, "Recommendation Intelligence", "Career Results & Output Intelligence", 
               "Rich occupational profiles displaying match rationale, skill requirements, salary, and growth metrics.")

    # Left Column: Features
    add_card(s9, Inches(0.8), Inches(1.95), Inches(5.6), Inches(4.9), bg_color=CARD_BG, border_color=CARD_BORDER)
    r_box = s9.shapes.add_textbox(Inches(1.05), Inches(2.15), Inches(5.1), Inches(4.5))
    rtf = r_box.text_frame
    rtf.word_wrap = True

    rtf.paragraphs[0].text = "📋 6 Core Intelligence Signals"
    rtf.paragraphs[0].font.size = Pt(14)
    rtf.paragraphs[0].font.bold = True
    rtf.paragraphs[0].font.color.rgb = TEXT_WHITE
    rtf.paragraphs[0].space_after = Pt(10)

    signals = [
        ("Circular Match Ring", "Custom MatchScore SVG indicator visually displaying compatibility percentage with animated stroke fill."),
        ("Personalized Rationale", "Dynamic text explaining specifically why this role fits the student's stream and chosen cognitive strengths."),
        ("Required Skills Badges", "Interactive tags outlining technical and non-technical proficiencies required for success."),
        ("Economic Outlook", "Estimated entry-level to experienced salary spectrum (e.g. ₹8 - 25 LPA) and 5-year growth trajectory."),
        ("Difficulty Classification", "Entry barrier index classifying academic intensity (Moderate, High, Very High)."),
        ("Action Integrations", "Direct triggers to 'Save Career' into Dashboard or view deep-dive details via dynamic routes.")
    ]

    for title, desc in signals:
        sp_t = rtf.add_paragraph()
        sp_t.text = f"✔ {title}"
        sp_t.font.size = Pt(11)
        sp_t.font.bold = True
        sp_t.font.color.rgb = ACCENT_CYAN
        sp_d = rtf.add_paragraph()
        sp_d.text = desc
        sp_d.font.size = Pt(9.5)
        sp_d.font.color.rgb = TEXT_MUTED
        sp_d.space_after = Pt(6)

    # Right Column: Career Card Pro Mockup
    add_card(s9, Inches(6.65), Inches(1.95), Inches(5.88), Inches(4.9), bg_color=CARD_BG_ALT, border_color=PRIMARY_BLUE)
    
    c_mock = s9.shapes.add_textbox(Inches(6.9), Inches(2.15), Inches(5.38), Inches(4.5))
    cmtf = c_mock.text_frame
    cmtf.word_wrap = True

    cmp1 = cmtf.paragraphs[0]
    cmp1.text = "🎯 Top Recommendation Match"
    cmp1.font.size = Pt(10)
    cmp1.font.color.rgb = ACCENT_CYAN
    cmp1.space_after = Pt(4)

    cmp2 = cmtf.add_paragraph()
    cmp2.text = "Artificial Intelligence Engineer"
    cmp2.font.size = Pt(16)
    cmp2.font.bold = True
    cmp2.font.color.rgb = TEXT_WHITE
    cmp2.space_after = Pt(2)

    cmp3 = cmtf.add_paragraph()
    cmp3.text = "Category: Technology & Computer Science  •  Difficulty: High"
    cmp3.font.size = Pt(9.5)
    cmp3.font.color.rgb = SECONDARY_PURPLE
    cmp3.space_after = Pt(10)

    cmp4 = cmtf.add_paragraph()
    cmp4.text = " [ ⭕ 95% Match Score ]      Salary: ₹12 - 35 LPA      Growth: Very High "
    cmp4.font.size = Pt(11.5)
    cmp4.font.bold = True
    cmp4.font.color.rgb = SUCCESS_GREEN
    cmp4.space_after = Pt(10)

    cmp5 = cmtf.add_paragraph()
    cmp5.text = "Why it matches: Your strong background in PCM, high academic score in mathematics, and selected passion for programming and AI algorithms make you an ideal candidate for AI engineering."
    cmp5.font.size = Pt(10)
    cmp5.font.color.rgb = TEXT_MUTED
    cmp5.space_after = Pt(10)

    cmp6 = cmtf.add_paragraph()
    cmp6.text = "Required Skills: [ Python ] [ Machine Learning ] [ Linear Algebra ] [ PyTorch ]"
    cmp6.font.size = Pt(9.5)
    cmp6.font.bold = True
    cmp6.font.color.rgb = ACCENT_CYAN
    cmp6.space_after = Pt(14)

    cmp7 = cmtf.add_paragraph()
    cmp7.text = " [ 💾 Bookmark Career ]                       [ View Career Details → ] "
    cmp7.font.size = Pt(11)
    cmp7.font.bold = True
    cmp7.font.color.rgb = PRIMARY_BLUE

    set_notes(s9, (
        "When recommendations are generated, the user sees a rich Career Card Pro component. On the right, you see our UI mockup. "
        "It includes a circular progress indicator showing the match percentage, key attributes like salary range and growth outlook, "
        "required skills chips, and most importantly, a personalized justification sentence explaining why the career was selected. "
        "The student can immediately bookmark this career into their dashboard or click through for full curriculum details."
    ))

    # =========================================================================
    # SLIDE 10: Career Management & Dashboard
    # =========================================================================
    s10 = prs.slides.add_slide(blank_layout)
    set_slide_bg(s10)
    add_header(s10, "Student Workspace", "User Dashboard: Career Management Hub", 
               "A protected multi-view dashboard enabling students to curate, monitor, and adapt their career portfolio.")

    # Left Column: Features
    add_card(s10, Inches(0.8), Inches(1.95), Inches(5.6), Inches(4.9), bg_color=CARD_BG, border_color=CARD_BORDER)
    d_box = s10.shapes.add_textbox(Inches(1.05), Inches(2.15), Inches(5.1), Inches(4.5))
    dtf = d_box.text_frame
    dtf.word_wrap = True

    dtf.paragraphs[0].text = "💼 Dashboard Capabilities"
    dtf.paragraphs[0].font.size = Pt(14)
    dtf.paragraphs[0].font.bold = True
    dtf.paragraphs[0].font.color.rgb = TEXT_WHITE
    dtf.paragraphs[0].space_after = Pt(10)

    dash_features = [
        ("Overview Command Center", "Personalized welcome header, active saved career count, and authenticated user email status."),
        ("Career Journey Tracker", "Directly visualizes student's top match readiness score and academic stream alignment status."),
        ("Saved Careers Manager", "Curated bookmark library allowing users to inspect saved roles, compare metrics, or remove items."),
        ("Profile Management Hub", "Controlled form allowing students to adjust preferences (stream, marks, interests) without retaking full assessment."),
        ("Daily Inspiration Widget", "Asynchronous API integration pulling live career wisdom with refresh and retry controls.")
    ]

    for title, desc in dash_features:
        dp_t = dtf.add_paragraph()
        dp_t.text = f"✔ {title}"
        dp_t.font.size = Pt(11)
        dp_t.font.bold = True
        dp_t.font.color.rgb = ACCENT_CYAN
        dp_d = dtf.add_paragraph()
        dp_d.text = desc
        dp_d.font.size = Pt(9.5)
        dp_d.font.color.rgb = TEXT_MUTED
        dp_d.space_after = Pt(6)

    # Right Column: Dashboard UI Mockup Frame
    add_card(s10, Inches(6.65), Inches(1.95), Inches(5.88), Inches(4.9), bg_color=CARD_BG_ALT, border_color=PRIMARY_BLUE)
    dash_mock = s10.shapes.add_textbox(Inches(6.9), Inches(2.15), Inches(5.38), Inches(4.5))
    dmtf = dash_mock.text_frame
    dmtf.word_wrap = True

    dmp1 = dmtf.paragraphs[0]
    dmp1.text = "👋 Welcome back, Aarav!"
    dmp1.font.size = Pt(16)
    dmp1.font.bold = True
    dmp1.font.color.rgb = TEXT_WHITE
    dmp1.space_after = Pt(2)

    dmp2 = dmtf.add_paragraph()
    dmp2.text = "Manage your career journey and review saved trajectories."
    dmp2.font.size = Pt(9.5)
    dmp2.font.color.rgb = TEXT_MUTED
    dmp2.space_after = Pt(10)

    dmp3 = dmtf.add_paragraph()
    dmp3.text = " [ 📁 4 Saved Careers ]             [ 👤 Signed in: aarav@example.com ] "
    dmp3.font.size = Pt(10.5)
    dmp3.font.bold = True
    dmp3.font.color.rgb = ACCENT_CYAN
    dmp3.space_after = Pt(12)

    dmp4 = dmtf.add_paragraph()
    dmp4.text = "⚡ Quick Actions:"
    dmp4.font.size = Pt(11)
    dmp4.font.bold = True
    dmp4.font.color.rgb = TEXT_WHITE
    dmp4.space_after = Pt(4)

    dmp5 = dmtf.add_paragraph()
    dmp5.text = " [ 🚀 Take Career Assessment ]     [ 📑 View Saved Careers ] "
    dmp5.font.size = Pt(10)
    dmp5.font.color.rgb = PRIMARY_BLUE
    dmp5.space_after = Pt(12)

    dmp6 = dmtf.add_paragraph()
    dmp6.text = "📈 Your Career Journey: Top Match: AI Engineer (95%)"
    dmp6.font.size = Pt(11)
    dmp6.font.bold = True
    dmp6.font.color.rgb = SUCCESS_GREEN
    dmp6.space_after = Pt(4)

    dmp7 = dmtf.add_paragraph()
    dmp7.text = " Progress: ███████████████████ 95%  •  Stream: PCM"
    dmp7.font.size = Pt(10)
    dmp7.font.color.rgb = TEXT_MUTED

    set_notes(s10, (
        "Once a user logs in, they access the User Dashboard. This acts as their personal career command center. "
        "It provides quick statistics on saved careers, confirms authenticated status, and displays the Career Journey banner "
        "driven by their latest assessment data. From here, students can launch the assessment, manage saved roles, update their profile, "
        "and read live career insights. It bridges one-time discovery with ongoing planning."
    ))

    # =========================================================================
    # SLIDE 11: Application Architecture
    # =========================================================================
    s11 = prs.slides.add_slide(blank_layout)
    set_slide_bg(s11)
    add_header(s11, "Engineering Design", "Frontend Architecture & Directory Structure", 
               "Modular component hierarchy separating presentation, domain data, custom hooks, and persistence.")

    arch_layers = [
        ("Layer 1: Entry & Router", "src/App.jsx & src/main.jsx", "Configures React Router v6 routing hierarchy, AuthProvider context wrapper, and MainLayout shell."),
        ("Layer 2: Views & Pages", "src/pages/*", "Encapsulates Home, About, Features, FAQ, CareerDiscovery wizard, CareerResults, CareerDetails, Dashboard, and Login."),
        ("Layer 3: UI Component Library", "src/components/ui/* & career/*", "Atomic design components: Button, OptionCard, MatchScore, ProgressBar, Modal, CareerCard, and FormStep wrappers."),
        ("Layer 4: Custom Hooks", "src/hooks/*", "Abstracts stateful logic: useCareerAssessment, useLocalStorage, useSavedCareers, and useDocumentTitle."),
        ("Layer 5: Domain Engine & Data", "src/utils/ & src/data/", "Deterministic recommendation logic (careerMatcher.js), career taxonomy catalog (careers.js), and question matrices."),
        ("Layer 6: Persistence & Storage", "localStorage / Context", "Client-side storage abstraction managing authentication tokens, profile archives, and saved career arrays.")
    ]

    for i, (l_title, l_path, l_desc) in enumerate(arch_layers):
        col = i % 3
        row = i // 3
        al_left = Inches(0.8 + col * 3.98)
        al_top = Inches(1.95 + row * 2.55)
        add_card(s11, al_left, al_top, Inches(3.78), Inches(2.35), bg_color=CARD_BG, border_color=CARD_BORDER)
        
        abox = s11.shapes.add_textbox(al_left + Inches(0.18), al_top + Inches(0.18), Inches(3.42), Inches(2.0))
        atf = abox.text_frame
        atf.word_wrap = True
        
        ap1 = atf.paragraphs[0]
        ap1.text = l_title
        ap1.font.size = Pt(12)
        ap1.font.bold = True
        ap1.font.color.rgb = ACCENT_CYAN
        
        ap2 = atf.add_paragraph()
        ap2.text = l_path
        ap2.font.size = Pt(9.5)
        ap2.font.bold = True
        ap2.font.color.rgb = PRIMARY_BLUE
        ap2.space_after = Pt(4)

        ap3 = atf.add_paragraph()
        ap3.text = l_desc
        ap3.font.size = Pt(10)
        ap3.font.color.rgb = TEXT_MUTED

    set_notes(s11, (
        "Here we show the architecture of our React application. We have deliberately structured it into 6 distinct layers: "
        "The App and Router layer at the top; the Pages layer representing views; the UI Component library for reusable atomic controls; "
        "the Custom Hooks layer containing reusable stateful logic; the Domain Engine and Data layer containing careerMatcher.js; "
        "and the Client Persistence layer. This separation of concerns ensures that our code is maintainable, testable, and ready for full-stack expansion."
    ))

    # =========================================================================
    # SLIDE 12: React Concepts Implemented
    # =========================================================================
    s12 = prs.slides.add_slide(blank_layout)
    set_slide_bg(s12)
    add_header(s12, "Technical Implementation", "React Concepts & Paradigms Applied", 
               "Demonstrating foundational, intermediate, and advanced React development methodologies.")

    react_quadrants = [
        ("React Fundamentals", "• Functional Components with JSX declarative syntax\n• Unidirectional Props flow and prop validation\n• Component composition via children props\n• Conditional rendering (&&, ternary operator)\n• Dynamic className modifiers for active UI states"),
        ("State Management & Forms", "• Controlled input bindings across text & range elements\n• Lifting state up from step components to assessment host\n• Immutable state updates using object & array spread\n• Cross-step multi-select array toggles\n• Form validation gatekeeping prior to navigation"),
        ("Performance & Optimization", "• useMemo caching top career calculation against stored profile\n• useCallback ensuring stable handler references for forms\n• Lazy state initialization for zero-overhead storage reads\n• Code modularization preventing unnecessary component tree re-renders"),
        ("Custom Hooks & Abstractions", "• useCareerAssessment: Centralizes wizard state & validation\n• useLocalStorage: Synchronizes state with browser storage\n• useSavedCareers: Manages bookmark add/remove operations\n• useDocumentTitle: Dynamically updates HTML page titles")
    ]

    for i, (q_title, q_items) in enumerate(react_quadrants):
        col = i % 2
        row = i // 2
        q_left = Inches(0.8 + col * 5.98)
        q_top = Inches(1.95 + row * 2.55)
        add_card(s12, q_left, q_top, Inches(5.75), Inches(2.35), bg_color=CARD_BG, border_color=CARD_BORDER)
        
        qbox = s12.shapes.add_textbox(q_left + Inches(0.2), q_top + Inches(0.18), Inches(5.35), Inches(2.0))
        qtf = qbox.text_frame
        qtf.word_wrap = True
        
        qp1 = qtf.paragraphs[0]
        qp1.text = q_title
        qp1.font.size = Pt(13)
        qp1.font.bold = True
        qp1.font.color.rgb = ACCENT_CYAN if i==0 else (PRIMARY_BLUE if i==1 else (SUCCESS_GREEN if i==2 else SECONDARY_PURPLE))
        qp1.space_after = Pt(6)

        qp2 = qtf.add_paragraph()
        qp2.text = q_items
        qp2.font.size = Pt(10.5)
        qp2.font.color.rgb = TEXT_MUTED

    set_notes(s12, (
        "This slide maps directly to our evaluation criteria by showcasing the React concepts applied in the project. "
        "First, core fundamentals including functional components, JSX, and conditional rendering; second, robust form management "
        "with controlled inputs and lifting state up; third, performance optimization using useMemo and useCallback to avoid recalculating "
        "heavy matching logic; and fourth, custom hooks to extract reusable state logic cleanly."
    ))

    # =========================================================================
    # SLIDE 13: React Hooks Implementation Matrix
    # =========================================================================
    s13 = prs.slides.add_slide(blank_layout)
    set_slide_bg(s13)
    add_header(s13, "Hooks Architecture", "React Hooks Implementation Matrix", 
               "Systematic application of standard and custom hooks for reactive state, effects, and memoization.")

    hooks_data = [
        ("useState", "Local Reactive State", "Manages form input values, current wizard step index, error messages, modal states, and API fetch status.", "Login.jsx, AcademicBgStep.jsx, CareerInsight.jsx"),
        ("useEffect", "Side Effects & Lifecycle", "Smoothly auto-scrolls to question top on step change, syncs document titles, and executes Fetch API call on mount.", "CareerDiscovery.jsx, CareerInsight.jsx, useDocumentTitle.js"),
        ("useRef", "DOM & Element References", "Auto-focuses first input on step mount and anchors smooth-scrolling container coordinates.", "AboutYouStep.jsx, CareerDiscovery.jsx"),
        ("useMemo", "Memoized Calculations", "Caches top recommendation computation; only re-evaluates when stored profile dependencies update.", "DashboardHome.jsx"),
        ("useCallback", "Memoized Handlers", "Provides stable function identity for profile submission and auth handlers, avoiding redundant child renders.", "CareerDiscovery.jsx, AuthContext.jsx"),
        ("Custom Hooks", "Encapsulated Domain Logic", "useCareerAssessment (wizard engine), useLocalStorage (storage sync), useSavedCareers (bookmarking).", "src/hooks/*.js")
    ]

    # Render as structured cards / table rows
    for i, (h_name, h_role, h_desc, h_loc) in enumerate(hooks_data):
        h_top = Inches(1.95 + i * 0.82)
        add_card(s13, Inches(0.8), h_top, Inches(11.733), Inches(0.74), bg_color=CARD_BG, border_color=CARD_BORDER)
        
        hbox = s13.shapes.add_textbox(Inches(0.95), h_top + Inches(0.08), Inches(11.433), Inches(0.6))
        htf = hbox.text_frame
        htf.word_wrap = True
        
        hp = htf.paragraphs[0]
        r1 = hp.add_run()
        r1.text = f"{h_name}  "
        r1.font.bold = True
        r1.font.size = Pt(12)
        r1.font.color.rgb = ACCENT_CYAN

        r2 = hp.add_run()
        r2.text = f"|  {h_role}: "
        r2.font.bold = True
        r2.font.size = Pt(10.5)
        r2.font.color.rgb = TEXT_WHITE

        r3 = hp.add_run()
        r3.text = f"{h_desc}  "
        r3.font.size = Pt(10)
        r3.font.color.rgb = TEXT_MUTED

        r4 = hp.add_run()
        r4.text = f"[{h_loc}]"
        r4.font.size = Pt(9)
        r4.font.color.rgb = SECONDARY_PURPLE

    set_notes(s13, (
        "Here we provide a comprehensive Hooks implementation matrix. In AVENZA, we do not just use useState and useEffect; "
        "we use useRef for programmatic DOM auto-focusing and scrolling; useMemo to prevent recomputing career matching unless "
        "the profile changes; useCallback for memoized submit handlers; and four custom hooks to keep our components clean and modular."
    ))

    # =========================================================================
    # SLIDE 14: React Router v6 Architecture
    # =========================================================================
    s14 = prs.slides.add_slide(blank_layout)
    set_slide_bg(s14)
    add_header(s14, "Navigation Infrastructure", "React Router v6 Navigation Architecture", 
               "Declarative routing tree supporting public pages, dynamic URL parameters, and protected authentication guards.")

    routes_sections = [
        ("🌐 Public Pages (MainLayout)", "• path=\"/\" → Home.jsx\n• path=\"about\" → About.jsx\n• path=\"features\" → Features.jsx\n• path=\"faq\" → FAQ.jsx\n• path=\"login\" → Login.jsx\n\nWrapped in MainLayout with sticky Navbar.", PRIMARY_BLUE),
        ("🧭 Assessment & Results", "• path=\"career-discovery\" → CareerDiscovery.jsx\n• path=\"career/results\" → CareerResults.jsx\n• path=\"career/:careerId\" → CareerDetails.jsx\n\nDynamic URL route parameter via useParams.", ACCENT_CYAN),
        ("🛡️ Protected Dashboard", "• path=\"dashboard\" → DashboardLayout.jsx\n  ├── index → DashboardHome.jsx\n  ├── \"profile\" → ProfilePage.jsx\n  └── \"saved-careers\" → SavedCareers.jsx\n\nGuarded by <ProtectedRoute> wrapper.", SUCCESS_GREEN),
        ("🛑 404 Fallback & Guards", "• path=\"*\" → NotFound.jsx\n\nCaptures all undefined paths.\nProtectedRoute redirects unauthenticated visitors to /login with state={{ from: location }}.", WARNING_AMBER)
    ]

    for i, (r_title, r_body, r_color) in enumerate(routes_sections):
        r_left = Inches(0.8 + i * 2.98)
        add_card(s14, r_left, Inches(1.95), Inches(2.82), Inches(4.9), bg_color=CARD_BG, border_color=CARD_BORDER)
        
        rbox = s14.shapes.add_textbox(r_left + Inches(0.18), Inches(2.15), Inches(2.46), Inches(4.5))
        rtf = rbox.text_frame
        rtf.word_wrap = True
        
        rp1 = rtf.paragraphs[0]
        rp1.text = r_title
        rp1.font.size = Pt(12)
        rp1.font.bold = True
        rp1.font.color.rgb = r_color
        rp1.space_after = Pt(8)

        rp2 = rtf.add_paragraph()
        rp2.text = r_body
        rp2.font.size = Pt(10)
        rp2.font.color.rgb = TEXT_MUTED

    set_notes(s14, (
        "Our routing architecture uses React Router v6 to handle every user pathway cleanly. "
        "We have public routes under MainLayout; the career assessment and results flow including dynamic routes like career/:careerId; "
        "a fully protected nested dashboard layout guarded by ProtectedRoute; and a wildcard 404 fallback. If an unauthenticated user "
        "attempts to reach the dashboard directly, they are redirected to login with their intended destination preserved."
    ))

    # =========================================================================
    # SLIDE 15: Client-Side Data Persistence
    # =========================================================================
    s15 = prs.slides.add_slide(blank_layout)
    set_slide_bg(s15)
    add_header(s15, "Data Architecture", "Client-Side Data Persistence Architecture", 
               "Synchronizing React state with browser localStorage through custom hook abstractions and JSON serialization.")

    # Left: Storage keys
    add_card(s15, Inches(0.8), Inches(1.95), Inches(5.6), Inches(4.9), bg_color=CARD_BG, border_color=CARD_BORDER)
    k_box = s15.shapes.add_textbox(Inches(1.05), Inches(2.15), Inches(5.1), Inches(4.5))
    ktf = k_box.text_frame
    ktf.word_wrap = True

    ktf.paragraphs[0].text = "🔑 LocalStorage Schema Keys"
    ktf.paragraphs[0].font.size = Pt(14)
    ktf.paragraphs[0].font.bold = True
    ktf.paragraphs[0].font.color.rgb = TEXT_WHITE
    ktf.paragraphs[0].space_after = Pt(10)

    keys = [
        ("avenza_profile", "Stores complete assessment submission: name, class, stream, marks, interests array, and cognitive strengths array."),
        ("avenza_auth_user", "Manages active authentication session object: user name, email address, and login timestamp."),
        ("avenza_saved_careers", "Maintains an array of bookmarked career IDs with helper methods to add, inspect, and remove bookmarks."),
        ("avenza_users", "Registry of demo user credentials allowing registered users to sign in and preventing arbitrary random string bypass.")
    ]

    for k_title, k_desc in keys:
        kp_t = ktf.add_paragraph()
        kp_t.text = f"• {k_title}"
        kp_t.font.size = Pt(11)
        kp_t.font.bold = True
        kp_t.font.color.rgb = ACCENT_CYAN
        kp_d = ktf.add_paragraph()
        kp_d.text = k_desc
        kp_d.font.size = Pt(9.5)
        kp_d.font.color.rgb = TEXT_MUTED
        kp_d.space_after = Pt(8)

    # Right: Lifecycle Pipeline
    add_card(s15, Inches(6.65), Inches(1.95), Inches(5.88), Inches(4.9), bg_color=CARD_BG_ALT, border_color=PRIMARY_BLUE)
    p_box = s15.shapes.add_textbox(Inches(6.9), Inches(2.15), Inches(5.38), Inches(4.5))
    ptf = p_box.text_frame
    ptf.word_wrap = True

    ptf.paragraphs[0].text = "🔄 State-to-Storage Synchronization"
    ptf.paragraphs[0].font.size = Pt(14)
    ptf.paragraphs[0].font.bold = True
    ptf.paragraphs[0].font.color.rgb = SUCCESS_GREEN
    ptf.paragraphs[0].space_after = Pt(12)

    pipe_steps = [
        ("1. User Action Trigger", "User toggles an option card or updates an input in the form."),
        ("2. Component State Update", "React setState triggers a component re-render with updated data."),
        ("3. useLocalStorage Sync", "Custom hook's useEffect detects value delta and runs JSON.stringify()."),
        ("4. Browser Storage Write", "Writes serialized JSON string directly to window.localStorage."),
        ("5. Lazy Hydration on Reload", "On page refresh, lazy useState initializer parses JSON to restore state.")
    ]

    for p_num, p_text in pipe_steps:
        pp1 = ptf.add_paragraph()
        pp1.text = p_num
        pp1.font.size = Pt(11)
        pp1.font.bold = True
        pp1.font.color.rgb = TEXT_WHITE
        pp2 = ptf.add_paragraph()
        pp2.text = p_text
        pp2.font.size = Pt(9.5)
        pp2.font.color.rgb = TEXT_MUTED
        pp2.space_after = Pt(6)

    set_notes(s15, (
        "Data persistence is vital for a smooth student experience. In Evaluation 1, we use browser localStorage via our custom hook useLocalStorage. "
        "We maintain four well-defined storage keys: avenza_profile, avenza_auth_user, avenza_saved_careers, and avenza_users. "
        "Whenever state changes, our hook serializes it into JSON. When the page reloads, lazy initialization hydrates the state seamlessly."
    ))

    # =========================================================================
    # SLIDE 16: Fetch API & Async Operations
    # =========================================================================
    s16 = prs.slides.add_slide(blank_layout)
    set_slide_bg(s16)
    add_header(s16, "Async JavaScript", "External Data Integration: Fetch API & Promises", 
               "Demonstrating modern asynchronous HTTP operations, Promise resolution, and 3-state conditional rendering.")

    # 3 State Cards
    states_data = [
        ("🔄 Loading State", "Tracks request in flight", "• useState(loading = true)\n• Animated CSS spinner rendered\n• UI controls disabled to prevent race conditions\n• Clear feedback: 'Loading career inspiration...'"),
        ("⚠️ Error & Retry State", "Graceful exception handling", "• try / catch (err) architecture\n• Catches network drops or non-200 HTTP codes\n• Displays user-friendly error notice\n• Interactive 'Retry' button triggers re-fetch"),
        ("✅ Populated Data State", "Successful Promise resolution", "• await response.json() extracts quote & author\n• Updates insight state\n• Formats blockquote with author citation\n• 'New Quote' button triggers fresh API call")
    ]

    for i, (st_title, st_sub, st_bullets) in enumerate(states_data):
        st_left = Inches(0.8 + i * 3.98)
        add_card(s16, st_left, Inches(1.95), Inches(3.78), Inches(3.2), bg_color=CARD_BG, border_color=CARD_BORDER)
        
        sbox = s16.shapes.add_textbox(st_left + Inches(0.18), Inches(2.1), Inches(3.42), Inches(2.9))
        stf = sbox.text_frame
        stf.word_wrap = True
        
        sp1 = stf.paragraphs[0]
        sp1.text = st_title
        sp1.font.size = Pt(13)
        sp1.font.bold = True
        sp1.font.color.rgb = WARNING_AMBER if i==0 else (DANGER_RED if i==1 else SUCCESS_GREEN)
        sp1.space_after = Pt(4)

        sp2 = stf.add_paragraph()
        sp2.text = st_sub
        sp2.font.size = Pt(10)
        sp2.font.bold = True
        sp2.font.color.rgb = TEXT_WHITE
        sp2.space_after = Pt(8)

        sp3 = stf.add_paragraph()
        sp3.text = st_bullets
        sp3.font.size = Pt(10)
        sp3.font.color.rgb = TEXT_MUTED

    # Bottom Technical Summary Card
    add_card(s16, Inches(0.8), Inches(5.35), Inches(11.733), Inches(1.5), bg_color=CARD_BG_ALT, border_color=PRIMARY_BLUE)
    t_box = s16.shapes.add_textbox(Inches(1.0), Inches(5.45), Inches(11.333), Inches(1.3))
    ttf = t_box.text_frame
    ttf.word_wrap = True

    tp1 = ttf.paragraphs[0]
    tp1.text = "💻 JavaScript Concepts Demonstrated in CareerInsight.jsx"
    tp1.font.size = Pt(12)
    tp1.font.bold = True
    tp1.font.color.rgb = ACCENT_CYAN
    tp1.space_after = Pt(4)

    tp2 = ttf.add_paragraph()
    tp2.text = "1. Fetch API (Standard browser HTTP networking)  •  2. Promises & async/await (Clean asynchronous syntax replacing callbacks)  •  3. try / catch / finally (Industrial error resilience)  •  4. useEffect on Mount (Automatic lifecycle execution)  •  5. Conditional UI Rendering (Tri-state loading / error / content rendering)."
    tp2.font.size = Pt(10)
    tp2.font.color.rgb = TEXT_MUTED

    set_notes(s16, (
        "To satisfy the asynchronous JavaScript syllabus requirements, we implemented CareerInsight.jsx on the Dashboard. "
        "It uses the standard Fetch API and async/await to call a public REST API. Notice our thorough 3-state conditional rendering: "
        "we display a spinner during loading; if the network fails, our try/catch block catches the error and displays a retry button; "
        "and on success, it renders the quote and author with a button to fetch another quote."
    ))

    # =========================================================================
    # SLIDE 17: Syllabus Coverage Checklist
    # =========================================================================
    s17 = prs.slides.add_slide(blank_layout)
    set_slide_bg(s17)
    add_header(s17, "Curriculum Alignment", "Academic Syllabus & Technical Competencies", 
               "Comprehensive checklist demonstrating full compliance with frontend web engineering requirements.")

    curriculum = [
        ("HTML5 & Modern CSS3", [
            "✔ Semantic markup (header, nav, main, section, aside)",
            "✔ Responsive Flexbox and multi-column CSS Grid",
            "✔ CSS Custom Properties (Design system variables)",
            "✔ Glassmorphism styling and dark gradient aesthetics",
            "✔ Media queries supporting desktop, tablet & mobile",
            "✔ SVG graphics and animated circular progress rings"
        ]),
        ("Modern JavaScript (ES6+)", [
            "✔ Arrow functions and lexical scoping",
            "✔ Destructuring assignment and Object/Array spread",
            "✔ Array methods: map(), filter(), find(), reduce()",
            "✔ JSON serialization & window.localStorage API",
            "✔ Promises, async/await, and Fetch API networking",
            "✔ Error handling with try / catch / finally blocks"
        ]),
        ("React & Application Architecture", [
            "✔ Functional components & JSX declarative syntax",
            "✔ Unidirectional props and component composition",
            "✔ Controlled form inputs and state lifting",
            "✔ 5 Standard React Hooks (useState, useEffect, useRef...)",
            "✔ 4 Custom Hooks encapsulating domain logic",
            "✔ React Router v6 dynamic and protected route guards"
        ])
    ]

    for i, (c_title, c_items) in enumerate(curriculum):
        c_left = Inches(0.8 + i * 3.98)
        add_card(s17, c_left, Inches(1.95), Inches(3.78), Inches(4.9), bg_color=CARD_BG, border_color=CARD_BORDER)
        
        cbox = s17.shapes.add_textbox(c_left + Inches(0.18), Inches(2.15), Inches(3.42), Inches(4.5))
        ctf = cbox.text_frame
        ctf.word_wrap = True
        
        cp1 = ctf.paragraphs[0]
        cp1.text = c_title
        cp1.font.size = Pt(13)
        cp1.font.bold = True
        cp1.font.color.rgb = ACCENT_CYAN if i==0 else (PRIMARY_BLUE if i==1 else SUCCESS_GREEN)
        cp1.space_after = Pt(10)

        for item in c_items:
            ip = ctf.add_paragraph()
            ip.text = item
            ip.font.size = Pt(10)
            ip.font.color.rgb = TEXT_MUTED
            ip.space_after = Pt(6)

    set_notes(s17, (
        "This slide directly proves that AVENZA covers 100% of the prescribed Front-End Engineering syllabus. "
        "Under HTML5 and CSS3: semantic tags, responsive flexbox and grid, and glassmorphism. "
        "Under modern JavaScript ES6+: arrow functions, spread operators, array methods, localStorage, promises, and async/await. "
        "And under React: functional components, state lifting, five core hooks, four custom hooks, and protected routing."
    ))

    # =========================================================================
    # SLIDE 18: Current Scope & Intentional Boundaries
    # =========================================================================
    s18 = prs.slides.add_slide(blank_layout)
    set_slide_bg(s18)
    add_header(s18, "Milestone Clarity", "Evaluation 1 Scope & Intentional Boundaries", 
               "Clear, transparent demarcation of our Phase 1 deliverables versus upcoming milestone goals.")

    scopes = [
        ("Frontend Single Page App", "CURRENT SCOPE (DELIVERED)", "A complete, interactive client-side application built on Vite and React. Operates with zero build warnings and rapid hot-module reloading.", SUCCESS_GREEN),
        ("Browser-Based Persistence", "CURRENT SCOPE (DELIVERED)", "Client-side localStorage is utilized for zero-infrastructure deployment. Ensures complete persistence across refreshes without database overhead.", SUCCESS_GREEN),
        ("Demo Authentication System", "CURRENT SCOPE (DELIVERED)", "Client-side credential hashing and session validation. Clearly designated as demo authentication to illustrate protected routes.", SUCCESS_GREEN),
        ("Rule-Based Matching Engine", "CURRENT SCOPE (DELIVERED)", "Deterministic, weighted algorithmic scoring matching student inputs against curated JSON career taxonomies.", SUCCESS_GREEN)
    ]

    for i, (sc_title, sc_badge, sc_desc, sc_color) in enumerate(scopes):
        col = i % 2
        row = i // 2
        s_left = Inches(0.8 + col * 5.98)
        s_top = Inches(1.95 + row * 2.1)
        add_card(s18, s_left, s_top, Inches(5.75), Inches(1.9), bg_color=CARD_BG, border_color=CARD_BORDER)
        
        sbox = s18.shapes.add_textbox(s_left + Inches(0.2), s_top + Inches(0.15), Inches(5.35), Inches(1.6))
        stf = sbox.text_frame
        stf.word_wrap = True
        
        sp1 = stf.paragraphs[0]
        sp1.text = sc_title
        sp1.font.size = Pt(13)
        sp1.font.bold = True
        sp1.font.color.rgb = TEXT_WHITE
        
        sp2 = stf.add_paragraph()
        sp2.text = sc_badge
        sp2.font.size = Pt(9)
        sp2.font.bold = True
        sp2.font.color.rgb = sc_color
        sp2.space_after = Pt(4)

        sp3 = stf.add_paragraph()
        sp3.text = sc_desc
        sp3.font.size = Pt(10)
        sp3.font.color.rgb = TEXT_MUTED

    # Bottom Callout Card
    add_card(s18, Inches(0.8), Inches(6.15), Inches(11.733), Inches(0.85), bg_color=CARD_BG_ALT, border_color=PRIMARY_BLUE)
    c_box = s18.shapes.add_textbox(Inches(1.0), Inches(6.25), Inches(11.333), Inches(0.65))
    ctf = c_box.text_frame
    ctf.word_wrap = True
    cp = ctf.paragraphs[0]
    cp.text = "📌 Note to Evaluators: Evaluation 1 strictly focuses on front-end excellence, reactive state engineering, and component modularity. Backend servers and databases are planned for Phase 2."
    cp.font.size = Pt(11)
    cp.font.bold = True
    cp.font.color.rgb = ACCENT_CYAN

    set_notes(s18, (
        "Transparency is critical for a technical evaluation. For Evaluation 1, our scope is strictly focused on front-end excellence. "
        "We have delivered a full client-side React SPA, browser-based persistence, demo authentication, and rule-based matching. "
        "We deliberately do not claim backend or real database capabilities in this milestone. Instead, we have built a rock-solid, bug-free "
        "frontend foundation that is ready for full-stack integration in our next evaluations."
    ))

    # =========================================================================
    # SLIDE 19: Future Roadmap (Evaluation 2)
    # =========================================================================
    s19 = prs.slides.add_slide(blank_layout)
    set_slide_bg(s19)
    add_header(s19, "Development Roadmap", "Evaluation 2: Backend Architecture & Data Scaling", 
               "Transitioning from client-side prototype to an industrial full-stack web application.")

    milestones_e2 = [
        ("01", "Node.js & Express REST Backend", "Developing centralized RESTful microservices to manage career catalogs, assessment records, and user data, replacing client-side mock operations."),
        ("02", "Database Persistence (MongoDB / PostgreSQL)", "Architecting schemas for user accounts, historical assessment attempts, custom career notes, and dynamic career information."),
        ("03", "Production Authentication & Security", "Implementing JSON Web Tokens (JWT), HTTP-only secure cookies, password hashing with bcrypt, and email verification."),
        ("04", "Expanded Career Taxonomy (200+ Roles)", "Scaling from our current 30-career test catalog to over 200+ verified occupational profiles with search, filter, and comparison tools.")
    ]

    for i, (num, title, desc) in enumerate(milestones_e2):
        col = i % 2
        row = i // 2
        e_left = Inches(0.8 + col * 5.98)
        e_top = Inches(1.95 + row * 2.55)
        add_card(s19, e_left, e_top, Inches(5.75), Inches(2.35), bg_color=CARD_BG, border_color=CARD_BORDER)
        
        ebox = s19.shapes.add_textbox(e_left + Inches(0.2), e_top + Inches(0.18), Inches(5.35), Inches(2.0))
        etf = ebox.text_frame
        etf.word_wrap = True
        
        ep1 = etf.paragraphs[0]
        ep1.text = f"MILESTONE {num}"
        ep1.font.size = Pt(10)
        ep1.font.bold = True
        ep1.font.color.rgb = ACCENT_CYAN
        ep1.space_after = Pt(2)

        ep2 = etf.add_paragraph()
        ep2.text = title
        ep2.font.size = Pt(13)
        ep2.font.bold = True
        ep2.font.color.rgb = TEXT_WHITE
        ep2.space_after = Pt(6)

        ep3 = etf.add_paragraph()
        ep3.text = desc
        ep3.font.size = Pt(10.5)
        ep3.font.color.rgb = TEXT_MUTED

    set_notes(s19, (
        "In Evaluation 2, our primary goal will be full-stack transformation. We will introduce a Node.js and Express REST backend; "
        "integrate MongoDB or PostgreSQL for persistent database storage; replace our demo auth with JWT and bcrypt security; "
        "and scale our career taxonomy from 30 careers to over 200 comprehensive job profiles with advanced filtering."
    ))

    # =========================================================================
    # SLIDE 20: Final Evaluation Vision (Evaluation 3)
    # =========================================================================
    s20 = prs.slides.add_slide(blank_layout)
    set_slide_bg(s20)
    add_header(s20, "Long-Term Vision", "Evaluation 3: Intelligent Full-Stack Ecosystem", 
               "The ultimate destination: An AI-augmented career mentoring and skill-gap acceleration platform.")

    # 3-Phase Progression Bar
    add_card(s20, Inches(0.8), Inches(1.95), Inches(11.733), Inches(0.9), bg_color=CARD_BG_ALT, border_color=PRIMARY_BLUE)
    bar_box = s20.shapes.add_textbox(Inches(1.0), Inches(2.05), Inches(11.333), Inches(0.7))
    btf = bar_box.text_frame
    btf.word_wrap = True
    bp = btf.paragraphs[0]
    bp.text = "PHASE 1: Frontend SPA (Done ✅)  ──▶  PHASE 2: Backend & DB (Next 🚀)  ──▶  PHASE 3: AI Engine & Final Product (Vision 🌟)"
    bp.font.size = Pt(12)
    bp.font.bold = True
    bp.font.color.rgb = ACCENT_CYAN

    # 4 Final Pillars
    final_pillars = [
        ("🤖 Machine Learning Matching Engine", "Replacing rule-based heuristics with vector embeddings and ML models trained on real career transitions and industry job requisitions."),
        ("🗺️ Dynamic Degree & Skill Roadmaps", "Personalized semester-by-semester roadmaps detailing recommended college degrees, online certifications, and milestone projects."),
        ("📊 Live Skill-Gap Analysis", "Direct comparison between student's current competencies and live industry job postings, recommending exact courses to close gaps."),
        ("👥 Mentor & Industry Connect", "Direct integration with professional mentors, industry webinars, and real-time hiring trajectory statistics.")
    ]

    for i, (f_title, f_desc) in enumerate(final_pillars):
        col = i % 2
        row = i // 2
        f_left = Inches(0.8 + col * 5.98)
        f_top = Inches(3.05 + row * 2.05)
        add_card(s20, f_left, f_top, Inches(5.75), Inches(1.85), bg_color=CARD_BG, border_color=CARD_BORDER)
        
        fbox = s20.shapes.add_textbox(f_left + Inches(0.2), f_top + Inches(0.15), Inches(5.35), Inches(1.55))
        ftf = fbox.text_frame
        ftf.word_wrap = True
        
        fp1 = ftf.paragraphs[0]
        fp1.text = f_title
        fp1.font.size = Pt(12.5)
        fp1.font.bold = True
        fp1.font.color.rgb = TEXT_WHITE
        fp1.space_after = Pt(4)

        fp2 = ftf.add_paragraph()
        fp2.text = f_desc
        fp2.font.size = Pt(10)
        fp2.font.color.rgb = TEXT_MUTED

    set_notes(s20, (
        "Looking forward to Evaluation 3, our vision is to evolve AVENZA into an intelligent, AI-augmented career ecosystem. "
        "We plan to introduce machine learning vector embeddings for career compatibility; generate dynamic, personalized degree and skill roadmaps; "
        "provide live skill-gap analysis comparing a student's skills against current job postings; and connect students with industry mentors. "
        "This clear 3-phase journey ensures that every evaluation builds naturally toward a complete final product."
    ))

    # =========================================================================
    # SLIDE 21: Conclusion
    # =========================================================================
    s21 = prs.slides.add_slide(blank_layout)
    set_slide_bg(s21)
    add_header(s21, "Evaluation Summary", "What We Have Achieved in Milestone 1", 
               "A fully functional, verified, and responsive Single Page Application delivered on schedule.")

    achievements = [
        ("✔ Production-Ready UI", "Dark glassmorphism aesthetic, responsive across devices with clean CSS variables."),
        ("✔ 6-Step Assessment Wizard", "Guided form with validation, range sliders, progress indicator, and state lifting."),
        ("✔ Algorithmic Matching Logic", "Transparent weighted compatibility scoring calculating affinity from 0% to 100%."),
        ("✔ Secured User Dashboard", "Protected workspace with career journey tracking, saved bookmarks, and profile editing."),
        ("✔ Asynchronous API Fetch", "Live Career Inspiration widget with loading spinner, error catch, and retry controls."),
        ("✔ Zero-Defect Codebase", "Vite production build verified passing in ~300ms with 0 errors and 0 warnings.")
    ]

    for i, (a_title, a_desc) in enumerate(achievements):
        col = i % 3
        row = i // 3
        ac_left = Inches(0.8 + col * 3.98)
        ac_top = Inches(1.95 + row * 1.95)
        add_card(s21, ac_left, ac_top, Inches(3.78), Inches(1.75), bg_color=CARD_BG, border_color=CARD_BORDER)
        
        ac_box = s21.shapes.add_textbox(ac_left + Inches(0.18), ac_top + Inches(0.15), Inches(3.42), Inches(1.45))
        actf = ac_box.text_frame
        actf.word_wrap = True
        
        ap1 = actf.paragraphs[0]
        ap1.text = a_title
        ap1.font.size = Pt(12)
        ap1.font.bold = True
        ap1.font.color.rgb = SUCCESS_GREEN
        ap1.space_after = Pt(4)

        ap2 = actf.add_paragraph()
        ap2.text = a_desc
        ap2.font.size = Pt(10)
        ap2.font.color.rgb = TEXT_MUTED

    # Final summary box
    add_card(s21, Inches(0.8), Inches(6.0), Inches(11.733), Inches(0.9), bg_color=CARD_BG_ALT, border_color=PRIMARY_BLUE)
    concl_box = s21.shapes.add_textbox(Inches(1.0), Inches(6.1), Inches(11.333), Inches(0.7))
    ctf = concl_box.text_frame
    ctf.word_wrap = True
    cp = ctf.paragraphs[0]
    cp.text = "🎯 Conclusion: AVENZA establishes a robust architectural foundation for student career guidance. Milestone 1 delivers a complete, verified frontend experience, setting the stage for full-stack maturity in Milestones 2 & 3."
    cp.font.size = Pt(11.5)
    cp.font.bold = True
    cp.font.color.rgb = ACCENT_CYAN

    set_notes(s21, (
        "To summarize our First Evaluation: we have successfully delivered a production-ready UI; an interactive 6-step wizard; "
        "a weighted matching algorithm; a protected student dashboard; asynchronous Fetch API integration; and a clean, verified codebase "
        "that compiles with zero errors. AVENZA establishes a rock-solid foundation, and we are excited to expand into backend architecture "
        "and database systems in Evaluation 2."
    ))

    # =========================================================================
    # SLIDE 22: Thank You Slide
    # =========================================================================
    s22 = prs.slides.add_slide(blank_layout)
    set_slide_bg(s22)

    # Hero card
    add_card(s22, Inches(1.8), Inches(1.2), Inches(9.733), Inches(5.1), bg_color=RGBColor(16, 24, 40), border_color=PRIMARY_BLUE, border_width=1.5)

    th_box = s22.shapes.add_textbox(Inches(2.2), Inches(1.6), Inches(8.933), Inches(4.3))
    th_tf = th_box.text_frame
    th_tf.word_wrap = True

    p_th1 = th_tf.paragraphs[0]
    p_th1.text = "AVENZA"
    p_th1.font.size = Pt(44)
    p_th1.font.bold = True
    p_th1.font.color.rgb = TEXT_WHITE
    p_th1.alignment = PP_ALIGN.CENTER
    p_th1.space_after = Pt(4)

    p_th2 = th_tf.add_paragraph()
    p_th2.text = "Discover Your Path. Build Your Future."
    p_th2.font.size = Pt(18)
    p_th2.font.color.rgb = ACCENT_CYAN
    p_th2.alignment = PP_ALIGN.CENTER
    p_th2.space_after = Pt(20)

    p_th3 = th_tf.add_paragraph()
    p_th3.text = "Thank You for Your Time & Guidance"
    p_th3.font.size = Pt(22)
    p_th3.font.bold = True
    p_th3.font.color.rgb = TEXT_WHITE
    p_th3.alignment = PP_ALIGN.CENTER
    p_th3.space_after = Pt(8)

    p_th4 = th_tf.add_paragraph()
    p_th4.text = "Project Based Evaluation – 1  •  Department of Computer Science & Engineering"
    p_th4.font.size = Pt(12)
    p_th4.font.color.rgb = TEXT_MUTED
    p_th4.alignment = PP_ALIGN.CENTER
    p_th4.space_after = Pt(20)

    p_th5 = th_tf.add_paragraph()
    p_th5.text = "💬 We are now open for Questions, Feedback, and Evaluator Discussion."
    p_th5.font.size = Pt(13)
    p_th5.font.bold = True
    p_th5.font.color.rgb = SUCCESS_GREEN
    p_th5.alignment = PP_ALIGN.CENTER

    set_notes(s22, (
        "Thank you very much, respected evaluators, for your time and attention. I am now open to your valuable feedback, questions, "
        "and suggestions as we prepare to transition into Evaluation 2."
    ))

    # Save presentation
    prs.save(output_path)
    print(f"Presentation successfully saved to: {output_path}")

if __name__ == '__main__':
    target = r"d:\Fee project\AVENZA_Project_Evaluation_1.pptx"
    build_presentation(target)
