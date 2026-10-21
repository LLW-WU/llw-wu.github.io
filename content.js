/* EDIT IN edit.html OR UPDATE THE TEXT BELOW.
   This is the single content file used by the public homepage.
   The editor downloads a replacement content.js after you finish writing. */
window.SITE_CONTENT = {
  "profile": {
    "name": "LIU Lingwen",
    "affiliation": "Ph.D. Student · Waseda University",
    "intro": "I study machine learning for medical imaging and complex networks. I also work with data-driven forecasting and am learning how to turn technical ideas into useful products.",
    "photo": "selfphoto.jpg",
    "email": "liulingwen@akane.waseda.jp",
    "scholar": "https://scholar.google.com/citations?user=CKPYcu4AAAAJ&hl=en&oi=ao",
    "github": "https://github.com/LLW-WU"
  },
  "tracks": {
    "research": {
      "label": "Research",
      "title": "AI Research & Engineering",
      "concept": "Failure-Driven Model Design",
      "summary": "I investigate where a model falls short, design a targeted change, and test whether it actually addresses the problem.",
      "steps": [
        "Observe failure",
        "Form a hypothesis",
        "Design a change",
        "Test and compare"
      ],
      "projects": [
        {
          "title": "MPI Vessel Reconstruction",
          "year": "2025–present",
          "context": "Waseda University · Ph.D. research in progress",
          "summary": "When image error is low but vessels are still distorted, how can reconstruction better preserve their structure?",
          "notes": "Current research in Magnetic Particle Imaging (MPI). Exploring structure-aware reconstruction from frequency-domain measurements. This is ongoing work, not a published result.",
          "url": "",
          "linkText": ""
        },
        {
          "title": "Self-supervised Representation Learning on Dynamic Graphs",
          "year": "2023–2025",
          "context": "Northeastern University (China) · research",
          "summary": "Learn useful graph representations from structural and temporal signals without depending entirely on labels.",
          "notes": "Labeling nodes in real-world networks is slow and expensive, yet the graph's own structure contains enormous latent information. I design self-supervised methods that use structural and temporal cues — topology, evolution, neighborhood patterns — as free supervision signals. The resulting representations generalize across domains: they surface anomalous financial transactions, uncover latent social communities, and improve brain disease classification without additional annotation. This line of work appeared at DASFAA 2025 and IEEE JBHI .",
          "url": "https://dl.acm.org/doi/abs/10.1145/3616855.3635765",
          "linkText": "Related paper"
        },
        {
          "title": "Graph-based Brain Network Analysis for Neurological Disease Diagnosis",
          "year": "Nov 2022 – Oct 2023",
          "context": "Northeastern University (China) · University of Alberta · Nanjing Medical University",
          "summary": "Used graph models to analyze functional brain connectivity for disease classification.",
          "notes": "Disease signals in the brain are subtle and distributed — no single region tells the full story. I built graph-based deep learning models that capture these distributed functional patterns across the whole brain, achieving diagnostic accuracy above 70%, a threshold that collaborating physicians at Nanjing Medical University recognized as clinically meaningful. This work was published at Computers in Biology and Medicine and presented at WSDM 2024 .",
          "url": "https://www.sciencedirect.com/science/article/pii/S001048252201229X",
          "linkText": "Related paper"
        },
        {
          "title": "Personalized Treatment Prediction for Mental Disorders via Multi-modal Learning",
          "year": "Dec 2023 – June 2025",
          "context": "Northeastern University (China) · Nanjing Medical University",
          "summary": "Combined imaging and behavioral data to examine patient subgroups and treatment outcomes.",
          "notes": "Two patients with the same psychiatric diagnosis can respond oppositely to the same treatment, yet this variability is rarely reflected in clinical decision-making. I build multi-modal models that jointly analyze brain functional signals and behavioral patterns to identify biologically distinct patient subgroups — using clustering, PCA, and t-SNE to make the structure visible to clinicians. The goal is to turn \"personalized treatment\" from a slogan into a data-driven workflow.",
          "url": "https://pubmed.ncbi.nlm.nih.gov/41062371/",
          "linkText": "Related paper"
        },
        {
          "title": "Early Screening for Cerebral Palsy via Machine Vision and Motion Analysis",
          "year": "Sep 2020 – Jun 2021",
          "context": "Shenyang University of Technology · Shenyang Children's Hospital",
          "summary": "Built a motion-capture and machine-vision workflow to support infant movement analysis.",
          "notes": "Cerebral palsy is far more treatable when caught early, but early screening still depends on subjective clinical judgment. I built an RGB-D motion capture system (Intel RealSense D435i) with a custom clinical interface to record infant movement, then trained deep learning models to extract subtle motor features predictive of cerebral palsy. Pediatricians at Shenyang Children's Hospital reviewed the identified features and incorporated them into their early diagnostic protocol.",
          "url": "",
          "linkText": ""
        },
        {
          "title": "Measuring Relaxation Response to Virtual Reality via Physiological Signals",
          "year": "Sep 2020 – Jun 2021",
          "context": "Shenyang University of Technology",
          "summary": "Used physiological measurements to study responses to VR-based relaxation.",
          "notes": "VR therapy is often promoted for stress and anxiety, but its physiological effects had not been rigorously characterized. I helped design experiments that collected EDA, EMG, and EEG signals while participants underwent structured VR relaxation scenarios, then used machine learning to identify consistent biomarkers of the relaxation response. The results gave the first empirical grounding for this class of intervention, published at IEEE ISR 2021 .",
          "url": "https://ieeexplore.ieee.org/abstract/document/9419557",
          "linkText": "Related paper"
        }
      ]
    },
    "data": {
      "label": "Data Science",
      "title": "Data Science & Decision Systems",
      "concept": "Decision-Oriented Analytics",
      "summary": "I turn a practical prediction question into a data workflow, compare models, diagnose errors, and assess what the results can support.",
      "steps": [
        "Define a question",
        "Explore the data",
        "Model and diagnose",
        "Interpret the result"
      ],
      "projects": [
        {
          "title": "Electricity Demand Forecasting",
          "year": "2024–2025",
          "context": "Goldwind · Data Science Internship",
          "summary": "Forecasted hourly electricity demand over a 14-day horizon using Random Forest and XGBoost.",
          "notes": "Industry forecasting project described in my original homepage. Exact validation design and per-model metrics can be added here. The source homepage reports these systems were integrated into operational workflows.",
          "url": "",
          "linkText": ""
        },
        {
          "title": "Microgrid Power Generation Forecasting",
          "year": "2024–2025",
          "context": "Goldwind · Data Science Internship",
          "summary": "Predicted next-day power generation under changing weather conditions using XGBoost and Lasso.",
          "notes": "Industry forecasting project described in my original homepage. Expand here with feature engineering, temporal data splitting, diagnostics and model comparison when ready.",
          "url": "",
          "linkText": ""
        },
        {
          "title": "Electricity Spot Price Forecasting",
          "year": "2024–2025",
          "context": "Goldwind · Data Science Internship",
          "summary": "Built a 14-day spot-price forecasting model using a PyTorch MLP.",
          "notes": "Industry forecasting project described in my original homepage. Add a clear error definition, baseline and evidence before quoting numerical performance.",
          "url": "",
          "linkText": ""
        },
        {
          "title": "Longitudinal Brain and Clinical Data Analysis",
          "year": "2023–2025",
          "context": "Northeastern University (China) · collaboration",
          "summary": "Used multimodal analysis, clustering and visualization to investigate patient subgroups and their outcomes.",
          "notes": "Two patients with the same psychiatric diagnosis can respond oppositely to the same treatment, yet this variability is rarely reflected in clinical decision-making. I build multi-modal models that jointly analyze brain functional signals and behavioral patterns to identify biologically distinct patient subgroups — using clustering, PCA, and t-SNE to make the structure visible to clinicians. The goal is to turn \"personalized treatment\" from a slogan into a data-driven workflow.",
          "url": "https://pubmed.ncbi.nlm.nih.gov/41062371/",
          "linkText": "Related paper"
        }
      ]
    },
    "business": {
      "label": "Business Design",
      "title": "AI Product & Business Design",
      "concept": "Need-to-Value Design",
      "summary": "I am learning how to identify a real need, propose a useful solution, and test whether the business model is viable.",
      "steps": [
        "Find a need",
        "Define the value",
        "Build a model",
        "Check the numbers"
      ],
      "projects": [
        {
          "title": "Business Design Coursework",
          "year": "Ongoing",
          "context": "Waseda University · coursework and practice",
          "summary": "Practicing need discovery, business-model design, financial statements, mission statements and presentations.",
          "notes": "This is a coursework-based learning area, not evidence of an established business or consulting engagement. Add actual course assignments and deliverables here when ready.",
          "url": "",
          "linkText": ""
        }
      ]
    }
  },
  "publications": [
    {
      "title": "Structure-aware Self-supervised Graph Representation Learning",
      "authors": "L Liu, P Cao, G Wen, Z Jia, J Yang, W Li, OR Zaiane",
      "venue": "DASFAA 2025 - International Conference on Database Systems for Advanced Applications, 2025",
      "year": "2025",
      "url": "https://dasfaa2025.github.io/paper/research/research_431_paper.pdf"
    },
    {
      "title": "BrainOSM: Outlier screening for multi-view functional brain network analysis",
      "authors": "G Guo, G Wen, L Liu, R Song, P Cao, J Yang, OR Zaiane",
      "venue": "Computer Methods and Programs in Biomedicine, 109092",
      "year": "2025",
      "url": "https://www.sciencedirect.com/science/article/pii/S0169260725005097"
    },
    {
      "title": "Divergent neural trajectories in young patients with major depressive episodes: longitudinal subtypes and their predictive value for treatment outcomes",
      "authors": "J Duan, G Wen, L Liu, S Gu, J Zhou, J Xu, R Zhu, S Hu, P Cao, F Wang",
      "venue": "Science Bulletin, S2095-9273 (25) 00917-X",
      "year": "2025",
      "url": "https://pubmed.ncbi.nlm.nih.gov/41062371/"
    },
    {
      "title": "Capturing temporal node evolution via self-supervised learning: A new perspective on dynamic graph learning",
      "authors": "L Liu, G Wen, P Cao, J Yang, W Li, OR Zaiane",
      "venue": "WSDM 2024 - Proceedings of the 17th ACM International Conference on Web Search and Data Mining",
      "year": "2024",
      "url": "https://dl.acm.org/doi/abs/10.1145/3616855.3635765"
    },
    {
      "title": "Heterogeneous Graph Representation Learning Framework for Resting-State Functional Connectivity Analysis",
      "authors": "G Wen, P Cao, L Liu, M Hao, S Liu, J Zheng, J Yang, OR Zaiane, F Wang",
      "venue": "IEEE Transactions on Medical Imaging",
      "year": "2024",
      "url": "https://ieeexplore.ieee.org/abstract/document/10781429"
    },
    {
      "title": "Towards Disease-Aware Self-Supervised Dynamic Brain Network Learning For Mental Diagnosis",
      "authors": "Z Lin, G Wen, P Cao, L Liu, J Yang, X Zhu, OR Zaiane, F Wang",
      "venue": "ICASSP 2024 - IEEE International Conference on Acoustics, Speech and Signal Processing",
      "year": "2024",
      "url": "https://ieeexplore.ieee.org/abstract/document/10446417"
    },
    {
      "title": "BrainTGL: A dynamic graph representation learning model for brain network analysis",
      "authors": "L Liu, G Wen, P Cao, T Hong, J Yang, X Zhang, OR Zaiane",
      "venue": "Computers in Biology and Medicine 153, 106521",
      "year": "2023",
      "url": "https://www.sciencedirect.com/science/article/pii/S001048252201229X"
    },
    {
      "title": "Graph self-supervised learning with application to brain networks analysis",
      "authors": "G Wen, P Cao, L Liu, J Yang, X Zhang, F Wang, OR Zaiane",
      "venue": "IEEE Journal of Biomedical and Health Informatics 27 (8), 4154-4165",
      "year": "2023",
      "url": "https://ieeexplore.ieee.org/abstract/document/10122156"
    },
    {
      "title": "Research and verification of a new relaxation technology based on virtual reality for human psychological security and psychosomatic recovery",
      "authors": "L Gu, B Sun, L Liu, Y Li, Q Zhang, J Yang",
      "venue": "2021 IEEE International Conference on Intelligence and Safety for Robotics",
      "year": "2021",
      "url": "https://ieeexplore.ieee.org/abstract/document/9419557"
    }
  ]
};
