/* Public homepage and CV content. Full project descriptions follow the supplied AR text. */
window.SITE_CONTENT = {
  "schemaVersion": 3,
  "revision": "self-content-20261023-details-v12",
  "profile": {
    "name": {
      "zh": "刘令文",
      "en": "LIU Lingwen"
    },
    "affiliation": {
      "zh": "早稻田大学 · 博士研究生",
      "en": "Ph.D. Student · Waseda University"
    },
    "intro": {
      "zh": "我的研究关注结构信息的表示学习，及其在脑网络分析和 MPI 血管重建中的应用。",
      "en": "My research focuses on learning representations of structural information, with applications in brain-network analysis and MPI vessel reconstruction."
    },
    "photo": "selfphoto.jpg",
    "email": "liulingwen@akane.waseda.jp",
    "scholar": "https://scholar.google.com/citations?user=CKPYcu4AAAAJ&hl=en&oi=ao",
    "github": "https://github.com/LLW-WU"
  },
  "tracks": {
    "research": {
      "label": {
        "zh": "学术科研",
        "en": "AI Research"
      },
      "title": {
        "zh": "AI Research (AR)",
        "en": "AI Research (AR)"
      },
      "concept": {
        "zh": "让模型理解结构，让判断有据可循",
        "en": "structure information-faithful learning"
      },
      "statement": {
        "zh": "让模型学到的结构，成为人能理解的判断依据。",
        "en": "Make the correct representation of key structures a design goal, rather than expecting it to emerge naturally during training."
      },
      "summary": {
        "zh": "我的研究围绕结构信息的表示展开：**把结构先验转化为学习目标**，设计**自监督与解耦学习方法**，再通过**实验比较与结构分析**检验模型学到了什么。这些工作涉及脑网络分析、通用图学习与 MPI 血管重建，关注表示的可靠性与评价标准。",
        "en": "My research centres on representations of structural information. I **turn structural priors into learning objectives**, design **self-supervised and disentangled learning methods**, and use **comparative experiments and structural analysis** to examine what models learn. My work spans brain-network analysis, general graph learning and MPI vessel reconstruction, with an emphasis on representation reliability and evaluation."
      },
      "steps": {
        "zh": [],
        "en": []
      },
      "groups": [
        {
          "id": "waseda",
          "institution": {
            "zh": "早稻田大学",
            "en": "Waseda University"
          },
          "period": {
            "zh": "2025—今",
            "en": "2025–present"
          },
          "title": {
            "zh": "",
            "en": ""
          },
          "description": {
            "zh": "",
            "en": ""
          },
          "focus": {
            "zh": "MPI 血管重建",
            "en": "MPI vessel reconstruction"
          },
          "connection": {
            "zh": "以结构辅助监督约束信号表示，使表示保留恢复血管结构所需的信息。",
            "en": "Use auxiliary structural supervision to preserve the information needed to recover vessel structures in signal representations."
          }
        },
        {
          "id": "neu-brain",
          "institution": {
            "zh": "东北大学",
            "en": "Northeastern University"
          },
          "period": {
            "zh": "2022—2025",
            "en": "2022–2025"
          },
          "title": {
            "zh": "方向一：让脑网络拓扑结构成为疾病诊断的线索",
            "en": "Direction 1: Brain-network topology as evidence for disease identification"
          },
          "description": {
            "zh": "大脑中的疾病信息不仅存在于单个脑区，还可能隐藏在脑区之间的连接、不同功能网络的交互，以及这些关系随时间发生的变化之中。我的研究将这些结构信息纳入表示学习，用于识别疾病、分析患者差异，并寻找能够反映治疗效果的脑网络特征。",
            "en": "Disease-related information may lie not only within individual brain regions but also in their connections, interactions between functional networks, and changes over time. I incorporate these structures into representation learning to identify diseases, analyse patient differences, and find brain-network features that reflect treatment outcomes."
          },
          "focus": {
            "zh": "脑网络与疾病分析",
            "en": "Brain networks and disease analysis"
          },
          "connection": {
            "zh": "将脑区连接、功能子网络交互与动态变化显式纳入表示学习。",
            "en": "Explicitly incorporate regional connectivity, functional-network interactions and dynamic changes into representation learning."
          }
        },
        {
          "id": "neu-graph",
          "institution": {
            "zh": "东北大学",
            "en": "Northeastern University"
          },
          "period": {
            "zh": "2022—2025",
            "en": "2022–2025"
          },
          "title": {
            "zh": "方向二：让AI识别图数据中容易被忽略的结构",
            "en": "Direction 2: Learning structures that are easily overlooked in graph data"
          },
          "description": {
            "zh": "图数据不仅包含每个对象自身的信息，也记录着它们之间的连接方式、以及这些关系如何变化。我的研究关注如何让表示学习保留具有任务价值的图连接拓扑结构，并区分稳定关系与动态变化，避免这些信息在通用特征学习中被忽略或混合。",
            "en": "Graph data describe individual objects, how they are connected, and how those relationships change. I study how representation learning can retain task-relevant graph topology and distinguish stable relationships from dynamic changes, rather than overlooking or mixing them during general feature learning."
          },
          "focus": {
            "zh": "通用图表示学习",
            "en": "General graph representation learning"
          },
          "connection": {
            "zh": "保留图连接拓扑，并将稳定关系与动态变化分开表示。",
            "en": "Retain graph connectivity topology while representing stable relationships and dynamic changes separately."
          }
        },
        {
          "id": "sut",
          "institution": {
            "zh": "沈阳工业大学",
            "en": "Shenyang University of Technology"
          },
          "period": {
            "zh": "2018—2022",
            "en": "2018–2022"
          },
          "title": {
            "zh": "",
            "en": ""
          },
          "description": {
            "zh": "",
            "en": ""
          }
        }
      ],
      "projects": [
        {
          "id": "mpi",
          "visible": true,
          "group": "waseda",
          "title": {
            "zh": "MPI血管成像重建逆问题需要结构拓扑辅助监督约束",
            "en": "The inverse problem of MPI vessel reconstruction requires auxiliary supervision of structural topology"
          },
          "year": {
            "zh": "",
            "en": ""
          },
          "context": {
            "zh": "",
            "en": ""
          },
          "summary": {
            "zh": "MPI 图像重建是一个从测量信号恢复图像的逆问题。对于血管成像，重建结果不仅需要呈现清晰的血管形态，还需要准确保留血管之间的连接关系。\n\n我的研究将血管结构信息作为逆问题求解的辅助约束，通过结构辅助监督，引导模型在信号表示中保留恢复血管结构所需的信息，以提高血管形态与连接关系的重建精度。",
            "en": "MPI image reconstruction is an inverse problem: recovering an image from measured signals. For vascular imaging, the reconstruction needs to recover both vessel shape and the connections between vessels.\n\nMy research uses vessel structure as an auxiliary constraint in solving this inverse problem. Through auxiliary structural supervision, I guide the model to retain information needed to recover vessel structures in its signal representations, with the aim of improving the reconstruction of vessel shape and connectivity."
          },
          "notes": {
            "zh": "",
            "en": ""
          },
          "url": "",
          "linkText": {
            "zh": "论文 ↗",
            "en": "Paper ↗"
          },
          "paperTitle": {
            "zh": "",
            "en": ""
          },
          "featured": true,
          "shortTitle": {
            "zh": "结构约束的 MPI 血管重建",
            "en": "Structure-guided MPI vessel reconstruction"
          },
          "brief": {
            "zh": "将血管结构信息作为 MPI 重建逆问题求解的辅助约束，引导模型保留恢复血管结构所需的信息。",
            "en": "Use vessel structure as an auxiliary constraint in solving the MPI reconstruction inverse problem, guiding the model to retain information needed to recover vessel structures."
          },
          "modelImage": "assets/models/mpi.webp",
          "modelCaption": {
            "zh": "MPI 血管重建 · 模型结构图",
            "en": "MPI vessel reconstruction · Model architecture"
          },
          "modelSource": "VesSBI-MPI-BSPC.pdf · Fig. 2 · p. 9",
          "modelName": {
            "zh": "",
            "en": ""
          },
          "role": {
            "zh": "",
            "en": ""
          },
          "contribution": {
            "zh": "",
            "en": ""
          },
          "publicationId": ""
        },
        {
          "id": "braintgl",
          "visible": true,
          "group": "neu-brain",
          "title": {
            "zh": "BrainTGL",
            "en": "BrainTGL"
          },
          "year": {
            "zh": "2023",
            "en": "2023"
          },
          "context": {
            "zh": "Computers in Biology and Medicine",
            "en": "Computers in Biology and Medicine"
          },
          "summary": {
            "zh": "人脑持续处于活动之中，脑区之间的沟通联系也会随时间变化，静态的建模方法难以完整保留和表示这些信息。BrainTGL是一个动态脑网络表示学习模型，将脑区自身的活动与脑区之间的连接变化共同建模，让动态结构参与疾病识别。在自闭症识别实验中，BrainTGL的准确率达到67.8%，而GroupINN和ST-GCN分别为63.4%和59.2%；在抑郁症和双相障碍识别中，准确率分别达到73.2%和72.0%。这些结果验证了同时学习脑区活动和连接变化对疾病识别的价值。",
            "en": "Brain activity is continuous, and communication between brain regions changes over time. Static models cannot fully retain or represent this information. BrainTGL is a dynamic brain-network representation learning model that jointly models activity within brain regions and changes in their connections, bringing dynamic structure into disease identification. In the autism classification experiment, BrainTGL achieved 67.8% accuracy, compared with 63.4% for GroupINN and 59.2% for ST-GCN; accuracy reached 73.2% for depression and 72.0% for bipolar disorder. These results support jointly learning regional activity and connectivity changes for disease identification."
          },
          "notes": {
            "zh": "",
            "en": ""
          },
          "url": "https://www.sciencedirect.com/science/article/pii/S001048252201229X",
          "linkText": {
            "zh": "论文 ↗",
            "en": "Paper ↗"
          },
          "paperTitle": {
            "zh": "BrainTGL：用于脑网络分析的动态图表示学习模型",
            "en": "BrainTGL: A dynamic graph representation learning model for brain network analysis"
          },
          "takeaway": {
            "zh": "脑区之间的联系连接方式会随时间变化，这种变化动态结构也是疾病识别的重要线索。",
            "en": "Connections between brain regions change over time, and these dynamic structures provide important clues for disease identification."
          },
          "featured": false,
          "brief": {
            "zh": "联合建模脑区活动与动态连接，让随时间变化的结构参与疾病识别。",
            "en": "Jointly model regional activity and dynamic connectivity for disease identification."
          },
          "result": {
            "zh": "自闭症、抑郁症与双相障碍识别准确率分别为 67.8%、73.2% 和 72.0%。",
            "en": "Accuracy of 67.8%, 73.2% and 72.0% for autism, depression and bipolar disorder, respectively."
          },
          "modelImage": "assets/models/braintgl.webp",
          "modelCaption": {
            "zh": "BrainTGL · 模型结构图",
            "en": "BrainTGL · Model architecture"
          },
          "modelSource": "BrainTGL- A dynamic graph representation learning model for brain network analysis.pdf · Fig. 2 · p. 3",
          "shortTitle": {
            "zh": "动态脑网络疾病识别",
            "en": "Disease identification with dynamic brain networks"
          },
          "modelName": {
            "zh": "BrainTGL",
            "en": "BrainTGL"
          },
          "role": {
            "zh": "",
            "en": ""
          },
          "contribution": {
            "zh": "",
            "en": ""
          },
          "publicationId": ""
        },
        {
          "id": "braingsl",
          "visible": true,
          "group": "neu-brain",
          "title": {
            "zh": "BrainGSL",
            "en": "BrainGSL"
          },
          "year": {
            "zh": "2023",
            "en": "2023"
          },
          "context": {
            "zh": "IEEE JBHI",
            "en": "IEEE JBHI"
          },
          "summary": {
            "zh": "脑影像数据难以获得大量医学标注，因此需要从数据本身学习可用于诊断的可复用结构信息。我们让模型去恢复被故意遮住的脑网络连接，从而促进模型学习脑区之间的拓扑连接规律，再用于疾病识别。研究发现，在自闭症数据上学到的表示能够帮助识别双相障碍，反向迁移也能改善自闭症识别，表明两类疾病数据中存在可以重复利用的脑网络特征。进一步分析发现，模型用于自闭症分类的 30 条关键连接中，23 条涉及前额叶，其中 9 条位于前额叶内部，使疾病识别的依据具体对应到了前额叶内部及其与其他脑区的联系。",
            "en": "Large-scale clinical annotation of brain imaging is difficult, so we seek reusable diagnostic structural information in the data itself. We train a model to restore deliberately masked brain connections, encouraging it to learn connectivity patterns before disease classification. Representations learned from autism data helped identify bipolar disorder, and transfer in the reverse direction also improved autism classification, indicating reusable brain-network features across these datasets. Of the 30 connections most important for autism classification, 23 involved the prefrontal region, including 9 within it, linking the model’s classification evidence to specific connections within and beyond the prefrontal region."
          },
          "notes": {
            "zh": "",
            "en": ""
          },
          "url": "https://ieeexplore.ieee.org/abstract/document/10122156",
          "linkText": {
            "zh": "论文 ↗",
            "en": "Paper ↗"
          },
          "paperTitle": {
            "zh": "面向脑网络分析的图自监督学习",
            "en": "Graph self-supervised learning with application to brain networks analysis"
          },
          "takeaway": {
            "zh": "脑网络的连接规律是可以跨疾病复用的知识，能够帮助模型在医学标注有限时学习疾病识别。",
            "en": "Brain-network connectivity patterns can provide reusable knowledge across diseases, helping models learn disease identification when clinical annotations are limited."
          },
          "featured": false,
          "brief": {
            "zh": "通过恢复被遮蔽的连接学习可复用拓扑信息，探索跨疾病的表示迁移。",
            "en": "Restore masked connections to learn reusable topology and explore representation transfer across diseases."
          },
          "result": {
            "zh": "30 条关键连接中，23 条涉及前额叶，其中 9 条位于前额叶内部。",
            "en": "Of 30 important connections, 23 involved the prefrontal region, including 9 within it."
          },
          "modelImage": "assets/models/braingsl.webp",
          "modelCaption": {
            "zh": "BrainGSL · 模型结构图",
            "en": "BrainGSL · Model architecture"
          },
          "modelSource": "Graph self-supervised learning with application to brain networks analysis.pdf · Fig. 2 · p. 4",
          "shortTitle": {
            "zh": "跨疾病脑网络表示迁移",
            "en": "Brain-network representation transfer across diseases"
          },
          "modelName": {
            "zh": "BrainGSL",
            "en": "BrainGSL"
          },
          "role": {
            "zh": "",
            "en": ""
          },
          "contribution": {
            "zh": "",
            "en": ""
          },
          "publicationId": ""
        },
        {
          "id": "sbdl",
          "visible": true,
          "group": "neu-brain",
          "title": {
            "zh": "SBDL",
            "en": "SBDL"
          },
          "year": {
            "zh": "2024",
            "en": "2024"
          },
          "context": {
            "zh": "ICASSP 2024",
            "en": "ICASSP 2024"
          },
          "summary": {
            "zh": "脑网络中的变化复杂多样，但并不都与疾病有关。我们以“疾病相关特征在一次扫描内相对稳定”为研究假设，通过结构表示学习，将持续存在的连接模式与短暂波动分开，减少无关变化对疾病识别的干扰。在自闭症识别实验中，只使用分离出的疾病相关表示，准确率达到70.4%；将两类表示混合使用时为68.1%，只使用另一类表示时为66.7%。模型识别出的15个关键脑区中，10个属于中央执行网络的枢纽节点，进一步将分离出的诊断信息定位到了具体的脑功能网络。",
            "en": "Not every change in a brain network is related to disease. Starting from the hypothesis that disease-related features remain relatively stable within a scan, we separate persistent connectivity patterns from transient fluctuations through structural representation learning, reducing interference from unrelated changes. For autism classification, the separated disease-related representation achieved 70.4% accuracy, compared with 68.1% when both representations were combined and 66.7% when only the other representation was used. Of the 15 brain regions identified as most important, 10 were hub nodes of the central executive network, connecting the separated diagnostic information to a specific functional network."
          },
          "notes": {
            "zh": "",
            "en": ""
          },
          "url": "https://ieeexplore.ieee.org/abstract/document/10446417",
          "linkText": {
            "zh": "论文 ↗",
            "en": "Paper ↗"
          },
          "paperTitle": {
            "zh": "面向精神疾病诊断的疾病感知自监督动态脑网络学习",
            "en": "Towards Disease-Aware Self-Supervised Dynamic Brain Network Learning For Mental Diagnosis"
          },
          "takeaway": {
            "zh": "脑网络的动态变化中混合着疾病线索与无关波动，将两者解耦可以减少疾病识别中的干扰信息。",
            "en": "Dynamic brain-network changes mix disease-related clues with unrelated fluctuations; disentangling them can reduce interference in disease identification."
          },
          "featured": false,
          "brief": {
            "zh": "解耦持续连接模式与短暂波动，减少无关变化对疾病识别的干扰。",
            "en": "Disentangle persistent connectivity patterns and transient fluctuations to reduce interference in disease identification."
          },
          "result": {
            "zh": "疾病相关表示的识别准确率为 70.4%，混合两类表示时为 68.1%。",
            "en": "Disease-related representations achieved 70.4% accuracy, compared with 68.1% when both representations were combined."
          },
          "modelImage": "assets/models/sbdl.webp",
          "modelCaption": {
            "zh": "SBDL · 模型结构图",
            "en": "SBDL · Model architecture"
          },
          "modelSource": "Towards Disease-Aware Self-Supervised Dynamic Brain Network Learning For Mental Diagnosis.pdf · Fig. 2 · p. 2",
          "shortTitle": {
            "zh": "疾病相关脑网络表示解耦",
            "en": "Disentangling disease-related brain representations"
          },
          "modelName": {
            "zh": "SBDL",
            "en": "SBDL"
          },
          "role": {
            "zh": "",
            "en": ""
          },
          "contribution": {
            "zh": "",
            "en": ""
          },
          "publicationId": ""
        },
        {
          "id": "brainhgl",
          "visible": true,
          "group": "neu-brain",
          "title": {
            "zh": "Heterogeneous Graph Representation Learning",
            "en": "Heterogeneous Graph Representation Learning"
          },
          "year": {
            "zh": "2024 · 在线发表",
            "en": "2024 · Online publication"
          },
          "context": {
            "zh": "IEEE TMI",
            "en": "IEEE TMI"
          },
          "summary": {
            "zh": "疾病线索不仅存在于单个脑区，也存在于不同脑功能网络的交互之中。我们设计了异构图表示学习方法，区分不同功能网络之间的连接类型，寻找各类疾病对应的结构线索。研究发现，在抑郁症识别中，最重要的连接模式通过显著性网络，将默认模式网络与中央执行网络联系起来；在自闭症识别中，排名前四的关键模式都包含默认模式网络与中央执行网络之间的连接。这项工作具体指出了模型在不同疾病识别任务中所依赖的网络连接组合，而不只是给出分类结果。",
            "en": "Disease-related information can lie in interactions between functional networks, not only in individual brain regions. We developed heterogeneous graph representation learning to distinguish connection types across functional networks and identify structural clues for different diseases. For depression identification, the most important connection pattern linked the default mode and central executive networks through the salience network. For autism identification, all four highest-ranked patterns involved connections between the default mode and central executive networks. This work identifies the network combinations used by the model in different disease-identification tasks, rather than reporting classification results alone."
          },
          "notes": {
            "zh": "",
            "en": ""
          },
          "url": "https://ieeexplore.ieee.org/abstract/document/10781429",
          "linkText": {
            "zh": "论文 ↗",
            "en": "Paper ↗"
          },
          "paperTitle": {
            "zh": "用于静息态功能连接分析的异构图表示学习框架",
            "en": "Heterogeneous Graph Representation Learning Framework for Resting-State Functional Connectivity Analysis"
          },
          "takeaway": {
            "zh": "疾病线索不仅存在于脑区之间的连接中，也存在于不同脑功能子网络相互连接的方式与组合中。",
            "en": "Disease-related clues lie not only in connections between brain regions, but also in how functional subnetworks connect and combine."
          },
          "featured": false,
          "brief": {
            "zh": "区分功能子网络之间的连接类型，分析模型在不同疾病识别中依赖的网络组合。",
            "en": "Distinguish connection types across functional networks and examine the network combinations used for disease identification."
          },
          "modelImage": "assets/models/brainhgl.webp",
          "modelCaption": {
            "zh": "BrainHGL · 模型结构图",
            "en": "BrainHGL · Model architecture"
          },
          "modelSource": "Heterogeneous Graph Representation Learning Framework for Resting-State Functional Connectivity Analysis.pdf · Fig. 3 · p. 4",
          "shortTitle": {
            "zh": "脑功能网络交互分析",
            "en": "Interactions across functional brain networks"
          },
          "modelName": {
            "zh": "BrainHGL",
            "en": "BrainHGL"
          },
          "role": {
            "zh": "",
            "en": ""
          },
          "contribution": {
            "zh": "",
            "en": ""
          },
          "publicationId": ""
        },
        {
          "id": "trajectories",
          "visible": true,
          "group": "neu-brain",
          "title": {
            "zh": "Divergent Neural Trajectories",
            "en": "Divergent Neural Trajectories"
          },
          "year": {
            "zh": "2025",
            "en": "2025"
          },
          "context": {
            "zh": "Science Bulletin",
            "en": "Science Bulletin"
          },
          "summary": {
            "zh": "同样经历抑郁发作，患者的脑网络也可能沿着不同的轨迹变化。我们通过学习治疗期间脑网络连接结构的变化，将患者分为两类。两类患者的默认模式网络与背侧注意网络之间的连接呈现不同趋势：治疗首周，第一类的平均连接减弱，第二类增强。第一类患者治疗前两周的脑连接变化，可以帮助预测出院时抑郁、焦虑和失眠症状改善多少；第二类则尚未发现脑连接变化与症状改善之间的显著关系，这项研究识别的是具有不同疗效预测特征的患者群体，并未证明哪一类患者治疗效果更好。",
            "en": "Patients experiencing depressive episodes can follow different trajectories of brain-network change. We learned connectivity changes during treatment and separated patients into two groups. During the first treatment week, average connectivity between the default mode and dorsal attention networks decreased in the first group but increased in the second. For the first group, brain-connectivity changes during the first two weeks helped predict improvements in depression, anxiety and insomnia at discharge. No significant relationship between connectivity changes and symptom improvement has yet been found in the second group. The study identifies groups with different treatment-outcome prediction characteristics; it does not establish that one group responds better to treatment."
          },
          "notes": {
            "zh": "",
            "en": ""
          },
          "url": "https://pubmed.ncbi.nlm.nih.gov/41062371/",
          "linkText": {
            "zh": "论文 ↗",
            "en": "Paper ↗"
          },
          "paperTitle": {
            "zh": "重性抑郁发作青年患者的分化神经轨迹：纵向亚型及其对治疗结局的预测价值",
            "en": "Divergent neural trajectories in young patients with major depressive episodes: longitudinal subtypes and their predictive value for treatment outcomes"
          },
          "takeaway": {
            "zh": "脑网络在治疗中的连接拓扑变化能够帮助区分患者，而这些变化能够帮助预测症状改善轨迹",
            "en": "Changes in brain-network topology during treatment can help distinguish patient groups and predict trajectories of symptom improvement."
          },
          "featured": false,
          "brief": {
            "zh": "学习治疗期间的脑网络变化，识别具有不同症状改善预测特征的患者群体。",
            "en": "Learn brain-network changes during treatment to identify patient groups with different symptom-improvement prediction characteristics."
          },
          "result": {
            "zh": "识别连接变化轨迹及预测关系不同的两类患者，未证明哪一类疗效更好。",
            "en": "Identify two groups with different connectivity trajectories and predictive relationships, without establishing better treatment response in either group."
          },
          "modelImage": "assets/models/trajectories.webp",
          "modelCaption": {
            "zh": "BrainHGL · 纵向研究流程图",
            "en": "BrainHGL · Longitudinal study framework"
          },
          "modelSource": "Divergent neural trajectories in young patients with major depressive episodes- longitudinal subtypes and their predictive value for treatment outcomes.pdf · Fig. 1 · p. 2",
          "shortTitle": {
            "zh": "脑网络拓扑与疗效预测",
            "en": "Brain-network topology for treatment prediction"
          },
          "modelName": {
            "zh": "BrainHGL",
            "en": "BrainHGL"
          },
          "role": {
            "zh": "",
            "en": ""
          },
          "contribution": {
            "zh": "",
            "en": ""
          },
          "publicationId": ""
        },
        {
          "id": "graphtel",
          "visible": true,
          "group": "neu-graph",
          "title": {
            "zh": "GraphTEL",
            "en": "GraphTEL"
          },
          "year": {
            "zh": "2025",
            "en": "2025"
          },
          "context": {
            "zh": "DASFAA 2025",
            "en": "DASFAA 2025"
          },
          "summary": {
            "zh": "节点特征相似，并不意味着它们的连接结构相同，而这些连接拓扑差异可能直接决定图的类别。GraphTEL是一种结构感知的自监督学习方法，让模型同时学习整体连接模式与局部结构细节，并通过恢复被遮住的连接，引导模型保留关键拓扑信息。在论文展示的分子图案例中，GraphMAE 将具有五边形和六边形连接差异的两个样本判为同一类别，GraphTEL 则正确区分了它们。在七个图分类数据集中的六个上，GraphTEL 的准确率高于 GraphMAE，说明显式学习连接结构能够补充普通节点特征学习遗漏的判别信息。",
            "en": "Similar node features do not imply the same connectivity structure, and these topological differences may determine a graph’s class. GraphTEL is a structure-aware self-supervised learning method that learns both global connectivity patterns and local structural details, using masked-connection reconstruction to preserve important topology. In the illustrated molecular-graph examples, GraphMAE assigned two graphs with pentagonal and hexagonal connectivity differences to the same class, while GraphTEL distinguished them correctly. GraphTEL achieved higher accuracy than GraphMAE on six of seven graph-classification datasets, showing how explicit structure learning can capture discriminative information missed by conventional node-feature learning."
          },
          "notes": {
            "zh": "",
            "en": ""
          },
          "url": "https://dasfaa2025.github.io/paper/research/research_431_paper.pdf",
          "linkText": {
            "zh": "论文 ↗",
            "en": "Paper ↗"
          },
          "paperTitle": {
            "zh": "结构感知的自监督图表示学习",
            "en": "Structure-aware Self-supervised Graph Representation Learning"
          },
          "takeaway": {
            "zh": "图数据即时节点特征相似，也可能会因为连接方式不同而属于不同类别，这些拓扑结构差异需要专门设计模型去学习。",
            "en": "Graphs with similar node features may belong to different classes because their connections differ; learning these topological differences requires deliberate model design."
          },
          "featured": true,
          "brief": {
            "zh": "通过结构感知自监督学习，同时保留全局连接模式与局部拓扑信息。",
            "en": "Learn global connectivity and local topology together through structure-aware self-supervision."
          },
          "result": {
            "zh": "7 个图分类数据集中，6 个的准确率高于 GraphMAE。",
            "en": "Higher accuracy than GraphMAE on six of seven graph-classification datasets."
          },
          "modelImage": "assets/models/graphtel.webp",
          "modelCaption": {
            "zh": "GraphTEL · 模型结构图",
            "en": "GraphTEL · Model architecture"
          },
          "modelSource": "Structure-aware Self-supervised Graph Representation Learning.pdf · Fig. 2 · p. 5",
          "shortTitle": {
            "zh": "结构感知的图自监督学习",
            "en": "Structure-aware graph self-supervision"
          },
          "modelName": {
            "zh": "GraphTEL",
            "en": "GraphTEL"
          },
          "role": {
            "zh": "",
            "en": ""
          },
          "contribution": {
            "zh": "",
            "en": ""
          },
          "publicationId": ""
        },
        {
          "id": "stdgl",
          "visible": true,
          "group": "neu-graph",
          "title": {
            "zh": "STDGL",
            "en": "STDGL"
          },
          "year": {
            "zh": "2024",
            "en": "2024"
          },
          "context": {
            "zh": "WSDM 2024",
            "en": "WSDM 2024"
          },
          "summary": {
            "zh": "动态图中的结构变化并不总是平稳的，突然出现的变化也可能包含重要的预测信息。我设计了自监督解耦学习方法，将相对稳定的连接规律与随时间变化的结构信息分开表示，避免两者在学习过程中相互混淆。在同一个 Bitcoin-Alpha 用户关系网络中，预测下一时刻会出现哪些连接时，变化表示优于稳定表示；判断连接的类别时，稳定表示则表现更好。在 Elliptic 交易网络的节点分类任务中，将两类表示结合使用的效果最好。研究由此明确了两类结构信息的不同作用：不同任务需要的并不是同一种动态表示，而是稳定信息、变化信息或两者的组合。",
            "en": "Structural evolution in dynamic graphs is not always smooth; abrupt changes can also contain useful predictive information. I designed a self-supervised disentanglement method that represents relatively stable connectivity patterns separately from structural changes, preventing them from being mixed during learning. On the same Bitcoin-Alpha user network, change representations performed better for predicting future links, while stable representations performed better for classifying links. On the Elliptic transaction network, combining both representations worked best for node classification. These results distinguish the roles of the two types of information: different tasks benefit from stability, change, or their combination rather than one universal dynamic representation."
          },
          "notes": {
            "zh": "",
            "en": ""
          },
          "url": "https://dl.acm.org/doi/abs/10.1145/3616855.3635765",
          "linkText": {
            "zh": "论文 ↗",
            "en": "Paper ↗"
          },
          "paperTitle": {
            "zh": "通过自监督学习捕捉节点的时间演化：动态图学习的新视角",
            "en": "Capturing temporal node evolution via self-supervised learning: A new perspective on dynamic graph learning"
          },
          "takeaway": {
            "zh": "动态图拓扑结构中的稳定变化模式与突发变化模式包含适用于不同任务的预测线索，将它们解耦分开，可以根据任务选择或组合使用。",
            "en": "Stable and abrupt patterns of change in dynamic graph topology contain predictive clues for different tasks; disentangling them allows task-specific selection or combination."
          },
          "featured": true,
          "brief": {
            "zh": "将稳定连接与动态变化分开表示，根据任务选择或组合使用。",
            "en": "Disentangle stable connectivity and dynamic changes, then select or combine them for each task."
          },
          "result": {
            "zh": "在链路预测、链路分类和节点分类中比较两类表示的作用。",
            "en": "Evaluate their different roles in link prediction, link classification and node classification."
          },
          "modelImage": "assets/models/stdgl.webp",
          "modelCaption": {
            "zh": "STDGL · 模型结构图",
            "en": "STDGL · Model architecture"
          },
          "modelSource": "Capturing temporal node evolution via self-supervised learning A new perspective on dynamic graph learning.pdf · Fig. 2 · p. 4",
          "shortTitle": {
            "zh": "动态图稳定与变化模式解耦",
            "en": "Disentangling stable and dynamic graph patterns"
          },
          "modelName": {
            "zh": "STDGL",
            "en": "STDGL"
          },
          "role": {
            "zh": "",
            "en": ""
          },
          "contribution": {
            "zh": "",
            "en": ""
          },
          "publicationId": ""
        },
        {
          "id": "vr",
          "visible": false,
          "group": "sut",
          "title": {
            "zh": "用于心理安全与身心恢复的虚拟现实放松技术研究与验证",
            "en": "Research and verification of a new relaxation technology based on virtual reality for human psychological security and psychosomatic recovery"
          },
          "year": {
            "zh": "2021",
            "en": "2021"
          },
          "context": {
            "zh": "IEEE ISR 2021",
            "en": "IEEE ISR 2021"
          },
          "summary": {
            "zh": "",
            "en": ""
          },
          "notes": {
            "zh": "",
            "en": ""
          },
          "url": "https://ieeexplore.ieee.org/abstract/document/9419557",
          "linkText": {
            "zh": "论文 ↗",
            "en": "Paper ↗"
          },
          "paperTitle": {
            "zh": "用于心理安全与身心恢复的虚拟现实放松技术研究与验证",
            "en": "Research and verification of a new relaxation technology based on virtual reality for human psychological security and psychosomatic recovery"
          },
          "featured": false
        },
        {
          "id": "infant",
          "visible": false,
          "group": "sut",
          "title": {
            "zh": "基于运动捕捉的婴幼儿脑瘫早期筛查系统",
            "en": "Motion-Capture-Based Early Screening System for Infant Cerebral Palsy"
          },
          "year": {
            "zh": "",
            "en": ""
          },
          "context": {
            "zh": "",
            "en": ""
          },
          "summary": {
            "zh": "",
            "en": ""
          },
          "notes": {
            "zh": "",
            "en": ""
          },
          "url": "",
          "linkText": {
            "zh": "论文 ↗",
            "en": "Paper ↗"
          },
          "paperTitle": {
            "zh": "",
            "en": ""
          },
          "featured": false
        }
      ],
      "emptyMessage": {
        "zh": "内容整理中。",
        "en": "Content in preparation."
      },
      "strengths": {
        "zh": [
          "**结构先验建模**　将拓扑知识转化为辅助监督和自监督目标。",
          "**方法设计**　设计结构感知、自监督与解耦学习方法。",
          "**实验与结构分析**　比较不同表示的作用，分析关键连接及其任务价值。"
        ],
        "en": [
          "**Structural priors** — Translate topology into auxiliary supervision and self-supervised objectives.",
          "**Method design** — Develop structure-aware, self-supervised and disentangled learning methods.",
          "**Experimental analysis** — Compare representations and examine task-relevant connections."
        ]
      }
    },
    "data": {
      "label": {
        "zh": "数据科学",
        "en": "Data Scientist"
      },
      "title": {
        "zh": "数据科学",
        "en": "Data Scientist"
      },
      "concept": {
        "zh": "",
        "en": ""
      },
      "statement": {
        "zh": "",
        "en": ""
      },
      "summary": {
        "zh": "",
        "en": ""
      },
      "steps": {
        "zh": [],
        "en": []
      },
      "groups": [],
      "projects": [],
      "emptyMessage": {
        "zh": "内容整理中。",
        "en": "Content in preparation."
      }
    },
    "business": {
      "label": {
        "zh": "商业设计",
        "en": "Business Design"
      },
      "title": {
        "zh": "商业设计",
        "en": "Business Design"
      },
      "concept": {
        "zh": "",
        "en": ""
      },
      "statement": {
        "zh": "",
        "en": ""
      },
      "summary": {
        "zh": "",
        "en": ""
      },
      "steps": {
        "zh": [],
        "en": []
      },
      "groups": [],
      "projects": [],
      "emptyMessage": {
        "zh": "内容整理中。",
        "en": "Content in preparation."
      }
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
      "url": "https://dasfaa2025.github.io/paper/research/research_431_paper.pdf",
      "id": "pub-0",
      "visible": true
    },
    {
      "title": {
        "zh": "BrainOSM：多视角功能脑网络分析中的离群点筛查",
        "en": "BrainOSM: Outlier screening for multi-view functional brain network analysis"
      },
      "authors": "G Guo, G Wen, L Liu, R Song, P Cao, J Yang, OR Zaiane",
      "venue": "Computer Methods and Programs in Biomedicine, 109092",
      "year": "2025",
      "url": "https://www.sciencedirect.com/science/article/pii/S0169260725005097",
      "id": "pub-1",
      "visible": false
    },
    {
      "title": {
        "zh": "重性抑郁发作青年患者的分化神经轨迹：纵向亚型及其对治疗结局的预测价值",
        "en": "Divergent neural trajectories in young patients with major depressive episodes: longitudinal subtypes and their predictive value for treatment outcomes"
      },
      "authors": "J Duan, G Wen, L Liu, S Gu, J Zhou, J Xu, R Zhu, S Hu, P Cao, F Wang",
      "venue": "Science Bulletin, S2095-9273 (25) 00917-X",
      "year": "2025",
      "url": "https://pubmed.ncbi.nlm.nih.gov/41062371/",
      "id": "pub-2",
      "visible": true
    },
    {
      "title": {
        "zh": "通过自监督学习捕捉节点的时间演化：动态图学习的新视角",
        "en": "Capturing temporal node evolution via self-supervised learning: A new perspective on dynamic graph learning"
      },
      "authors": "L Liu, G Wen, P Cao, J Yang, W Li, OR Zaiane",
      "venue": "WSDM 2024 - Proceedings of the 17th ACM International Conference on Web Search and Data Mining",
      "year": "2024",
      "url": "https://dl.acm.org/doi/abs/10.1145/3616855.3635765",
      "id": "pub-3",
      "visible": true
    },
    {
      "title": {
        "zh": "用于静息态功能连接分析的异构图表示学习框架",
        "en": "Heterogeneous Graph Representation Learning Framework for Resting-State Functional Connectivity Analysis"
      },
      "authors": "G Wen, P Cao, L Liu, M Hao, S Liu, J Zheng, J Yang, OR Zaiane, F Wang",
      "venue": "IEEE Transactions on Medical Imaging",
      "year": "2024",
      "url": "https://ieeexplore.ieee.org/abstract/document/10781429",
      "id": "pub-4",
      "visible": true
    },
    {
      "title": {
        "zh": "面向精神疾病诊断的疾病感知自监督动态脑网络学习",
        "en": "Towards Disease-Aware Self-Supervised Dynamic Brain Network Learning For Mental Diagnosis"
      },
      "authors": "Z Lin, G Wen, P Cao, L Liu, J Yang, X Zhu, OR Zaiane, F Wang",
      "venue": "ICASSP 2024 - IEEE International Conference on Acoustics, Speech and Signal Processing",
      "year": "2024",
      "url": "https://ieeexplore.ieee.org/abstract/document/10446417",
      "id": "pub-5",
      "visible": true
    },
    {
      "title": {
        "zh": "BrainTGL：用于脑网络分析的动态图表示学习模型",
        "en": "BrainTGL: A dynamic graph representation learning model for brain network analysis"
      },
      "authors": "L Liu, G Wen, P Cao, T Hong, J Yang, X Zhang, OR Zaiane",
      "venue": "Computers in Biology and Medicine 153, 106521",
      "year": "2023",
      "url": "https://www.sciencedirect.com/science/article/pii/S001048252201229X",
      "id": "pub-6",
      "visible": true
    },
    {
      "title": {
        "zh": "面向脑网络分析的图自监督学习",
        "en": "Graph self-supervised learning with application to brain networks analysis"
      },
      "authors": "G Wen, P Cao, L Liu, J Yang, X Zhang, F Wang, OR Zaiane",
      "venue": "IEEE Journal of Biomedical and Health Informatics 27 (8), 4154-4165",
      "year": "2023",
      "url": "https://ieeexplore.ieee.org/abstract/document/10122156",
      "id": "pub-7",
      "visible": true
    },
    {
      "title": {
        "zh": "用于心理安全与身心恢复的虚拟现实放松技术研究与验证",
        "en": "Research and verification of a new relaxation technology based on virtual reality for human psychological security and psychosomatic recovery"
      },
      "authors": "L Gu, B Sun, L Liu, Y Li, Q Zhang, J Yang",
      "venue": "2021 IEEE International Conference on Intelligence and Safety for Robotics",
      "year": "2021",
      "url": "https://ieeexplore.ieee.org/abstract/document/9419557",
      "id": "pub-8",
      "visible": true
    }
  ]
};
