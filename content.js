/* Site copy is bilingual. Use edit.html to write Chinese and English text. */
window.SITE_CONTENT = {
  "profile": {
    "name": {
      "zh": "LIU Lingwen",
      "en": "LIU Lingwen"
    },
    "affiliation": {
      "zh": "早稻田大学 · 博士研究生",
      "en": "Ph.D. Student · Waseda University"
    },
    "intro": {
      "zh": "我目前在早稻田大学从事医学影像重建与图表示学习研究，也有能源预测方面的数据科学实践经历。我正在学习如何从真实需求出发，将技术方案转化为可用的产品与服务。",
      "en": "I study machine learning for medical imaging and complex networks. I also work with data-driven forecasting and am learning how to turn technical ideas into useful products."
    },
    "photo": "selfphoto.jpg",
    "email": "liulingwen@akane.waseda.jp",
    "scholar": "https://scholar.google.com/citations?user=CKPYcu4AAAAJ&hl=en&oi=ao",
    "github": "https://github.com/LLW-WU"
  },
  "tracks": {
    "research": {
      "label": {
        "zh": "技术研究",
        "en": "Research"
      },
      "title": {
        "zh": "AI 技术研究与工程",
        "en": "AI Research & Engineering"
      },
      "concept": {
        "zh": "失败驱动的模型设计",
        "en": "Failure-Driven Model Design"
      },
      "summary": {
        "zh": "从模型的失败现象出发，分析原因，设计针对性修改，并通过实验判断修改是否有效。",
        "en": "I investigate where a model falls short, design a targeted change, and test whether it actually addresses the problem."
      },
      "steps": {
        "zh": [
          "定位失败现象",
          "提出原因假设",
          "设计针对性修改",
          "对照实验验证"
        ],
        "en": [
          "Observe failure",
          "Form a hypothesis",
          "Design a change",
          "Test and compare"
        ]
      },
      "projects": [
        {
          "title": {
            "zh": "MPI 血管重建",
            "en": "MPI Vessel Reconstruction"
          },
          "year": {
            "zh": "2025 年至今",
            "en": "2025–present"
          },
          "context": {
            "zh": "早稻田大学 · 博士研究（进行中）",
            "en": "Waseda University · Ph.D. research in progress"
          },
          "summary": {
            "zh": "为什么像素误差较低，重建出的血管仍可能失真？探索结构感知的 MPI 重建方法。",
            "en": "When image error is low but vessels are still distorted, how can reconstruction better preserve their structure?"
          },
          "notes": {
            "zh": "当前研究方向为从 MPI 频域测量中学习结构信息，并将其用于血管重建。仍属于进行中的研究，不代表已发表结果。",
            "en": "Current research in Magnetic Particle Imaging (MPI). Exploring structure-aware reconstruction from frequency-domain measurements. This is ongoing work, not a published result."
          },
          "url": "",
          "linkText": {
            "zh": "",
            "en": "Read more ↗"
          }
        },
        {
          "title": {
            "zh": "动态图的自监督表示学习",
            "en": "Self-supervised Representation Learning on Dynamic Graphs"
          },
          "year": {
            "zh": "2023–2025",
            "en": "2023–2025"
          },
          "context": {
            "zh": "东北大学（中国） · 科研",
            "en": "Northeastern University (China) · research"
          },
          "summary": {
            "zh": "利用图的结构与时间演化信息学习表示，减少对人工标注的依赖。",
            "en": "Learn useful graph representations from structural and temporal signals without depending entirely on labels."
          },
          "notes": {
            "zh": "研究动态图中节点的时间演化、拓扑结构与自监督目标。可继续补充：观察到的失败案例、关键假设、模型设计与消融实验。",
            "en": "Labeling nodes in real-world networks is slow and expensive, yet the graph's own structure contains enormous latent information. I design self-supervised methods that use structural and temporal cues — topology, evolution, neighborhood patterns — as free supervision signals. The resulting representations generalize across domains: they surface anomalous financial transactions, uncover latent social communities, and improve brain disease classification without additional annotation. This line of work appeared at DASFAA 2025 and IEEE JBHI ."
          },
          "url": "https://dl.acm.org/doi/abs/10.1145/3616855.3635765",
          "linkText": {
            "zh": "相关链接 ↗",
            "en": "Related paper"
          }
        },
        {
          "title": {
            "zh": "功能脑网络分析与疾病分类",
            "en": "Graph-based Brain Network Analysis for Neurological Disease Diagnosis"
          },
          "year": {
            "zh": "2022.11–2023.10",
            "en": "Nov 2022 – Oct 2023"
          },
          "context": {
            "zh": "东北大学（中国） · 阿尔伯塔大学 · 南京医科大学",
            "en": "Northeastern University (China) · University of Alberta · Nanjing Medical University"
          },
          "summary": {
            "zh": "将功能脑连接构建为图，分析不同脑区之间的关联以支持疾病分类研究。",
            "en": "Used graph models to analyze functional brain connectivity for disease classification."
          },
          "notes": {
            "zh": "研究涉及 fMRI 功能连接网络建模、图神经网络以及临床合作验证。可补充具体数据集、误差分析、模型结构与实验结果。",
            "en": "Disease signals in the brain are subtle and distributed — no single region tells the full story. I built graph-based deep learning models that capture these distributed functional patterns across the whole brain, achieving diagnostic accuracy above 70%, a threshold that collaborating physicians at Nanjing Medical University recognized as clinically meaningful. This work was published at Computers in Biology and Medicine and presented at WSDM 2024 ."
          },
          "url": "https://www.sciencedirect.com/science/article/pii/S001048252201229X",
          "linkText": {
            "zh": "相关链接 ↗",
            "en": "Related paper"
          }
        },
        {
          "title": {
            "zh": "精神疾病治疗反应的多模态分析",
            "en": "Personalized Treatment Prediction for Mental Disorders via Multi-modal Learning"
          },
          "year": {
            "zh": "2023.12–2025.06",
            "en": "Dec 2023 – June 2025"
          },
          "context": {
            "zh": "东北大学（中国） · 南京医科大学",
            "en": "Northeastern University (China) · Nanjing Medical University"
          },
          "summary": {
            "zh": "结合脑影像与临床行为数据，探索患者亚群及治疗反应的差异。",
            "en": "Combined imaging and behavioral data to examine patient subgroups and treatment outcomes."
          },
          "notes": {
            "zh": "使用多模态学习及聚类、PCA、t-SNE 等分析方法研究患者的异质性。具体临床意义应以合作研究论文所支持的结论为准。",
            "en": "Two patients with the same psychiatric diagnosis can respond oppositely to the same treatment, yet this variability is rarely reflected in clinical decision-making. I build multi-modal models that jointly analyze brain functional signals and behavioral patterns to identify biologically distinct patient subgroups — using clustering, PCA, and t-SNE to make the structure visible to clinicians. The goal is to turn \"personalized treatment\" from a slogan into a data-driven workflow."
          },
          "url": "https://pubmed.ncbi.nlm.nih.gov/41062371/",
          "linkText": {
            "zh": "相关链接 ↗",
            "en": "Related paper"
          }
        },
        {
          "title": {
            "zh": "婴幼儿脑瘫早筛：机器视觉与运动分析",
            "en": "Early Screening for Cerebral Palsy via Machine Vision and Motion Analysis"
          },
          "year": {
            "zh": "2020.09–2021.06",
            "en": "Sep 2020 – Jun 2021"
          },
          "context": {
            "zh": "沈阳工业大学 · 沈阳市儿童医院",
            "en": "Shenyang University of Technology · Shenyang Children's Hospital"
          },
          "summary": {
            "zh": "利用 RGB-D 相机采集运动信息，探索辅助婴幼儿早期运动异常筛查的方法。",
            "en": "Built a motion-capture and machine-vision workflow to support infant movement analysis."
          },
          "notes": {
            "zh": "项目包含 Intel RealSense D435i 运动采集、临床界面和运动特征建模。可补充实验样本、评估协议和已验证的结果。",
            "en": "Cerebral palsy is far more treatable when caught early, but early screening still depends on subjective clinical judgment. I built an RGB-D motion capture system (Intel RealSense D435i) with a custom clinical interface to record infant movement, then trained deep learning models to extract subtle motor features predictive of cerebral palsy. Pediatricians at Shenyang Children's Hospital reviewed the identified features and incorporated them into their early diagnostic protocol."
          },
          "url": "",
          "linkText": {
            "zh": "",
            "en": "Read more ↗"
          }
        },
        {
          "title": {
            "zh": "虚拟现实放松反应的生理信号研究",
            "en": "Measuring Relaxation Response to Virtual Reality via Physiological Signals"
          },
          "year": {
            "zh": "2020.09–2021.06",
            "en": "Sep 2020 – Jun 2021"
          },
          "context": {
            "zh": "沈阳工业大学",
            "en": "Shenyang University of Technology"
          },
          "summary": {
            "zh": "采集 EDA、EMG、EEG 等生理信号，研究虚拟现实放松体验中的生理反应。",
            "en": "Used physiological measurements to study responses to VR-based relaxation."
          },
          "notes": {
            "zh": "通过结构化实验采集信号并使用机器学习分析可区分的响应特征。相关研究发表于 IEEE ISR 2021。",
            "en": "VR therapy is often promoted for stress and anxiety, but its physiological effects had not been rigorously characterized. I helped design experiments that collected EDA, EMG, and EEG signals while participants underwent structured VR relaxation scenarios, then used machine learning to identify consistent biomarkers of the relaxation response. The results gave the first empirical grounding for this class of intervention, published at IEEE ISR 2021 ."
          },
          "url": "https://ieeexplore.ieee.org/abstract/document/9419557",
          "linkText": {
            "zh": "相关链接 ↗",
            "en": "Related paper"
          }
        }
      ]
    },
    "data": {
      "label": {
        "zh": "数据科学",
        "en": "Data Science"
      },
      "title": {
        "zh": "数据科学与决策分析",
        "en": "Data Science & Decision Systems"
      },
      "concept": {
        "zh": "面向决策的数据分析",
        "en": "Decision-Oriented Analytics"
      },
      "summary": {
        "zh": "从真实问题出发，观察数据、建立和比较模型，再判断结果能够支持什么决策。",
        "en": "I turn a practical prediction question into a data workflow, compare models, diagnose errors, and assess what the results can support."
      },
      "steps": {
        "zh": [
          "定义问题",
          "探索数据",
          "建模与诊断",
          "解释与决策"
        ],
        "en": [
          "Define a question",
          "Explore the data",
          "Model and diagnose",
          "Interpret the result"
        ]
      },
      "projects": [
        {
          "title": {
            "zh": "电力负荷预测",
            "en": "Electricity Demand Forecasting"
          },
          "year": {
            "zh": "2024–2025",
            "en": "2024–2025"
          },
          "context": {
            "zh": "金风科技 · 数据科学实习",
            "en": "Goldwind · Data Science Internship"
          },
          "summary": {
            "zh": "使用随机森林与 XGBoost，预测未来 14 天的逐小时用电需求。",
            "en": "Forecasted hourly electricity demand over a 14-day horizon using Random Forest and XGBoost."
          },
          "notes": {
            "zh": "可补充：时间序列切分、输入特征、基线模型、误差分布和预测如何进入业务流程。",
            "en": "Industry forecasting project described in my original homepage. Exact validation design and per-model metrics can be added here. The source homepage reports these systems were integrated into operational workflows."
          },
          "url": "",
          "linkText": {
            "zh": "",
            "en": "Read more ↗"
          }
        },
        {
          "title": {
            "zh": "微电网发电量预测",
            "en": "Microgrid Power Generation Forecasting"
          },
          "year": {
            "zh": "2024–2025",
            "en": "2024–2025"
          },
          "context": {
            "zh": "金风科技 · 数据科学实习",
            "en": "Goldwind · Data Science Internship"
          },
          "summary": {
            "zh": "结合天气变化，使用 XGBoost 与 Lasso 预测次日发电量。",
            "en": "Predicted next-day power generation under changing weather conditions using XGBoost and Lasso."
          },
          "notes": {
            "zh": "可补充：天气特征、异常天气条件下的失败样本，以及特征重要性的验证方法。",
            "en": "Industry forecasting project described in my original homepage. Expand here with feature engineering, temporal data splitting, diagnostics and model comparison when ready."
          },
          "url": "",
          "linkText": {
            "zh": "",
            "en": "Read more ↗"
          }
        },
        {
          "title": {
            "zh": "电力现货价格预测",
            "en": "Electricity Spot Price Forecasting"
          },
          "year": {
            "zh": "2024–2025",
            "en": "2024–2025"
          },
          "context": {
            "zh": "金风科技 · 数据科学实习",
            "en": "Goldwind · Data Science Internship"
          },
          "summary": {
            "zh": "使用 PyTorch MLP 构建未来 14 天的电价预测模型。",
            "en": "Built a 14-day spot-price forecasting model using a PyTorch MLP."
          },
          "notes": {
            "zh": "可补充：问题定义、预测窗口、基线和误差评估指标。原网站中的数值表现需先明确指标定义。",
            "en": "Industry forecasting project described in my original homepage. Add a clear error definition, baseline and evidence before quoting numerical performance."
          },
          "url": "",
          "linkText": {
            "zh": "",
            "en": "Read more ↗"
          }
        },
        {
          "title": {
            "zh": "纵向脑影像与临床数据分析",
            "en": "Longitudinal Brain and Clinical Data Analysis"
          },
          "year": {
            "zh": "2023–2025",
            "en": "2023–2025"
          },
          "context": {
            "zh": "东北大学（中国） · 合作科研",
            "en": "Northeastern University (China) · collaboration"
          },
          "summary": {
            "zh": "使用多模态分析、聚类和可视化方法，研究患者亚群与治疗结果的联系。",
            "en": "Used multimodal analysis, clustering and visualization to investigate patient subgroups and their outcomes."
          },
          "notes": {
            "zh": "涉及脑影像与临床数据的联合分析。若展示具体统计关联或结论，应附论文、方法及验证依据。",
            "en": "Two patients with the same psychiatric diagnosis can respond oppositely to the same treatment, yet this variability is rarely reflected in clinical decision-making. I build multi-modal models that jointly analyze brain functional signals and behavioral patterns to identify biologically distinct patient subgroups — using clustering, PCA, and t-SNE to make the structure visible to clinicians. The goal is to turn \"personalized treatment\" from a slogan into a data-driven workflow."
          },
          "url": "https://pubmed.ncbi.nlm.nih.gov/41062371/",
          "linkText": {
            "zh": "相关链接 ↗",
            "en": "Related paper"
          }
        }
      ]
    },
    "business": {
      "label": {
        "zh": "商业设计",
        "en": "Business Design"
      },
      "title": {
        "zh": "AI 产品与商业设计",
        "en": "AI Product & Business Design"
      },
      "concept": {
        "zh": "从需求到价值的设计",
        "en": "Need-to-Value Design"
      },
      "summary": {
        "zh": "我正在学习如何挖掘用户需求，设计价值主张与商业模式，并利用财务分析检验方案。",
        "en": "I am learning how to identify a real need, propose a useful solution, and test whether the business model is viable."
      },
      "steps": {
        "zh": [
          "挖掘需求",
          "明确价值主张",
          "设计商业模式",
          "检验财务可行性"
        ],
        "en": [
          "Find a need",
          "Define the value",
          "Build a model",
          "Check the numbers"
        ]
      },
      "projects": [
        {
          "title": {
            "zh": "商业设计课程训练",
            "en": "Business Design Coursework"
          },
          "year": {
            "zh": "持续学习中",
            "en": "Ongoing"
          },
          "context": {
            "zh": "早稻田大学 · 课程作业与练习",
            "en": "Waseda University · coursework and practice"
          },
          "summary": {
            "zh": "练习需求挖掘、价值主张、商业模型、财务报表、企业宗旨和项目展示。",
            "en": "Practicing need discovery, business-model design, financial statements, mission statements and presentations."
          },
          "notes": {
            "zh": "这是课程学习方向，不代表已经完成商业咨询或实际盈利项目。建议今后按案例整理：目标用户 → 痛点证据 → 产品方案 → 商业模式 → 财务假设 → 验证结果。",
            "en": "This is a coursework-based learning area, not evidence of an established business or consulting engagement. Add actual course assignments and deliverables here when ready."
          },
          "url": "",
          "linkText": {
            "zh": "",
            "en": "Read more ↗"
          }
        }
      ]
    }
  },
  "publications": [
    {
      "title": {
        "zh": "结构感知的自监督图表示学习",
        "en": "Structure-aware Self-supervised Graph Representation Learning"
      },
      "authors": "L Liu, P Cao, G Wen, Z Jia, J Yang, W Li, OR Zaiane",
      "venue": "DASFAA 2025 - International Conference on Database Systems for Advanced Applications, 2025",
      "year": "2025",
      "url": "https://dasfaa2025.github.io/paper/research/research_431_paper.pdf"
    },
    {
      "title": {
        "zh": "BrainOSM：多视角功能脑网络分析中的离群点筛查",
        "en": "BrainOSM: Outlier screening for multi-view functional brain network analysis"
      },
      "authors": "G Guo, G Wen, L Liu, R Song, P Cao, J Yang, OR Zaiane",
      "venue": "Computer Methods and Programs in Biomedicine, 109092",
      "year": "2025",
      "url": "https://www.sciencedirect.com/science/article/pii/S0169260725005097"
    },
    {
      "title": {
        "zh": "重性抑郁发作青年患者的分化神经轨迹：纵向亚型及其对治疗结局的预测价值",
        "en": "Divergent neural trajectories in young patients with major depressive episodes: longitudinal subtypes and their predictive value for treatment outcomes"
      },
      "authors": "J Duan, G Wen, L Liu, S Gu, J Zhou, J Xu, R Zhu, S Hu, P Cao, F Wang",
      "venue": "Science Bulletin, S2095-9273 (25) 00917-X",
      "year": "2025",
      "url": "https://pubmed.ncbi.nlm.nih.gov/41062371/"
    },
    {
      "title": {
        "zh": "通过自监督学习捕捉节点的时间演化：动态图学习的新视角",
        "en": "Capturing temporal node evolution via self-supervised learning: A new perspective on dynamic graph learning"
      },
      "authors": "L Liu, G Wen, P Cao, J Yang, W Li, OR Zaiane",
      "venue": "WSDM 2024 - Proceedings of the 17th ACM International Conference on Web Search and Data Mining",
      "year": "2024",
      "url": "https://dl.acm.org/doi/abs/10.1145/3616855.3635765"
    },
    {
      "title": {
        "zh": "用于静息态功能连接分析的异构图表示学习框架",
        "en": "Heterogeneous Graph Representation Learning Framework for Resting-State Functional Connectivity Analysis"
      },
      "authors": "G Wen, P Cao, L Liu, M Hao, S Liu, J Zheng, J Yang, OR Zaiane, F Wang",
      "venue": "IEEE Transactions on Medical Imaging",
      "year": "2024",
      "url": "https://ieeexplore.ieee.org/abstract/document/10781429"
    },
    {
      "title": {
        "zh": "面向精神疾病诊断的疾病感知自监督动态脑网络学习",
        "en": "Towards Disease-Aware Self-Supervised Dynamic Brain Network Learning For Mental Diagnosis"
      },
      "authors": "Z Lin, G Wen, P Cao, L Liu, J Yang, X Zhu, OR Zaiane, F Wang",
      "venue": "ICASSP 2024 - IEEE International Conference on Acoustics, Speech and Signal Processing",
      "year": "2024",
      "url": "https://ieeexplore.ieee.org/abstract/document/10446417"
    },
    {
      "title": {
        "zh": "BrainTGL：用于脑网络分析的动态图表示学习模型",
        "en": "BrainTGL: A dynamic graph representation learning model for brain network analysis"
      },
      "authors": "L Liu, G Wen, P Cao, T Hong, J Yang, X Zhang, OR Zaiane",
      "venue": "Computers in Biology and Medicine 153, 106521",
      "year": "2023",
      "url": "https://www.sciencedirect.com/science/article/pii/S001048252201229X"
    },
    {
      "title": {
        "zh": "面向脑网络分析的图自监督学习",
        "en": "Graph self-supervised learning with application to brain networks analysis"
      },
      "authors": "G Wen, P Cao, L Liu, J Yang, X Zhang, F Wang, OR Zaiane",
      "venue": "IEEE Journal of Biomedical and Health Informatics 27 (8), 4154-4165",
      "year": "2023",
      "url": "https://ieeexplore.ieee.org/abstract/document/10122156"
    },
    {
      "title": {
        "zh": "用于心理安全与身心恢复的虚拟现实放松技术研究与验证",
        "en": "Research and verification of a new relaxation technology based on virtual reality for human psychological security and psychosomatic recovery"
      },
      "authors": "L Gu, B Sun, L Liu, Y Li, Q Zhang, J Yang",
      "venue": "2021 IEEE International Conference on Intelligence and Safety for Robotics",
      "year": "2021",
      "url": "https://ieeexplore.ieee.org/abstract/document/9419557"
    }
  ]
};
