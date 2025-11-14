from crewai import Agent, Crew, Process, Task
from crewai.project import CrewBase, agent, crew, task
from crewai.agents.agent_builder.base_agent import BaseAgent
from crewai_tools import (
    FileReadTool,
    FileWriterTool,
    DirectoryReadTool,
    SerperDevTool,
    WebsiteSearchTool,
    ScrapeWebsiteTool,
    CodeDocsSearchTool,
    GithubSearchTool,
)
from typing import List
import os

# If you want to run a snippet of code before or after the crew starts,
# you can use the @before_kickoff and @after_kickoff decorators
# https://docs.crewai.com/concepts/crews#example-crew-class-with-decorators


@CrewBase
class TechStar:
    """TechStar crew - Personalized AI Learning Platform with Multi-Agent System"""

    agents: List[BaseAgent]
    tasks: List[Task]

    def __init__(self):
        """Initialize and ensure output directories exist"""
        self._ensure_output_directories()

    def _ensure_output_directories(self):
        """Create all output directories for agent FileWriterTools"""
        agent_dirs = [
            'learning_experience_designer', 'educational_psychologist', 'meta_learning_coach',
            'ai_educator', 'senior_ai_engineer', 'mlops_engineer', 'research_scientist',
            'ai_recommendation_engineer', 'ai_tutor_agent', 'ai_strategist', 'career_coach',
            'technical_recruiter', 'mock_interview_coach', 'branding_mentor', 'product_manager',
            'ai_platform_architect', 'full_stack_lead', 'ui_ux_designer', 'gamification_designer',
            'frontend_engineer', 'backend_engineer', 'data_engineer', 'data_visualization_specialist',
            'qa_engineer', 'devops_engineer', 'security_engineer', 'technical_writer',
            'open_source_mentor', 'community_leader', 'networking_specialist'
        ]

        for agent_dir in agent_dirs:
            dir_path = os.path.join('./output', agent_dir)
            os.makedirs(dir_path, exist_ok=True)

    # Learn more about YAML configuration files here:
    # Agents: https://docs.crewai.com/concepts/agents#yaml-configuration-recommended
    # Tasks: https://docs.crewai.com/concepts/tasks#yaml-configuration-recommended

    ###########################################################################
    # AGENTS - Learning & Strategy
    ###########################################################################

    @agent
    def learning_experience_designer(self) -> Agent:
        return Agent(
            config=self.agents_config['learning_experience_designer'],
            verbose=True,
            tools=[
                FileWriterTool(
                    directory='./output/learning_experience_designer'),
                SerperDevTool(),
                WebsiteSearchTool()
            ]
        )

    @agent
    def educational_psychologist(self) -> Agent:
        return Agent(
            config=self.agents_config['educational_psychologist'],
            verbose=True,
            tools=[
                FileWriterTool(directory='./output/educational_psychologist'),
                SerperDevTool(),
                FileReadTool()
            ]
        )

    @agent
    def meta_learning_coach(self) -> Agent:
        return Agent(
            config=self.agents_config['meta_learning_coach'],
            verbose=True,
            tools=[
                FileWriterTool(directory='./output/meta_learning_coach'),
                FileReadTool()
            ]
        )

    @agent
    def ai_educator(self) -> Agent:
        return Agent(
            config=self.agents_config['ai_educator'],
            verbose=True,
            tools=[
                FileWriterTool(directory='./output/ai_educator'),
                SerperDevTool(),
                WebsiteSearchTool()
            ]
        )

    ###########################################################################
    # AGENTS - AI/ML Engineering
    ###########################################################################

    @agent
    def senior_ai_engineer(self) -> Agent:
        return Agent(
            config=self.agents_config['senior_ai_engineer'],
            verbose=True,
            tools=[
                FileWriterTool(directory='./output/senior_ai_engineer'),
                GithubSearchTool(gh_token=os.getenv('GH_TOKEN')),
                CodeDocsSearchTool(),
                SerperDevTool()
            ]
        )

    @agent
    def mlops_engineer(self) -> Agent:
        return Agent(
            config=self.agents_config['mlops_engineer'],
            verbose=True,
            tools=[
                FileWriterTool(directory='./output/mlops_engineer'),
                GithubSearchTool(gh_token=os.getenv('GH_TOKEN')),
                CodeDocsSearchTool(),
                SerperDevTool()
            ]
        )

    @agent
    def research_scientist(self) -> Agent:
        return Agent(
            config=self.agents_config['research_scientist'],
            verbose=True,
            tools=[
                FileWriterTool(directory='./output/research_scientist'),
                SerperDevTool(),
                WebsiteSearchTool(),
                ScrapeWebsiteTool()
            ]
        )

    @agent
    def ai_recommendation_engineer(self) -> Agent:
        return Agent(
            config=self.agents_config['ai_recommendation_engineer'],
            verbose=True,
            tools=[
                FileWriterTool(
                    directory='./output/ai_recommendation_engineer'),
                CodeDocsSearchTool(),
                GithubSearchTool(gh_token=os.getenv('GH_TOKEN')),
                SerperDevTool()
            ]
        )

    @agent
    def ai_tutor_agent(self) -> Agent:
        return Agent(
            config=self.agents_config['ai_tutor_agent'],
            verbose=True,
            tools=[
                FileReadTool(),
                FileWriterTool(directory='./output/ai_tutor_agent'),
                SerperDevTool()
            ]
        )

    @agent
    def ai_strategist(self) -> Agent:
        return Agent(
            config=self.agents_config['ai_strategist'],
            verbose=True,
            tools=[
                FileWriterTool(directory='./output/ai_strategist'),
                SerperDevTool(),
                WebsiteSearchTool(),
                ScrapeWebsiteTool()
            ]
        )

    ###########################################################################
    # AGENTS - Career & Positioning
    ###########################################################################

    @agent
    def career_coach(self) -> Agent:
        return Agent(
            config=self.agents_config['career_coach'],
            verbose=True,
            tools=[
                FileWriterTool(directory='./output/career_coach'),
                SerperDevTool(),
                WebsiteSearchTool()
            ]
        )

    @agent
    def technical_recruiter(self) -> Agent:
        return Agent(
            config=self.agents_config['technical_recruiter'],
            verbose=True,
            tools=[
                FileWriterTool(directory='./output/technical_recruiter'),
                SerperDevTool(),
                WebsiteSearchTool(),
                ScrapeWebsiteTool()
            ]
        )

    @agent
    def mock_interview_coach(self) -> Agent:
        return Agent(
            config=self.agents_config['mock_interview_coach'],
            verbose=True,
            tools=[
                FileWriterTool(directory='./output/mock_interview_coach'),
                FileReadTool(),
                SerperDevTool()
            ]
        )

    @agent
    def branding_mentor(self) -> Agent:
        return Agent(
            config=self.agents_config['branding_mentor'],
            verbose=True,
            tools=[
                FileWriterTool(directory='./output/branding_mentor'),
                SerperDevTool(),
                WebsiteSearchTool()
            ]
        )

    ###########################################################################
    # AGENTS - Product & Architecture
    ###########################################################################

    @agent
    def product_manager(self) -> Agent:
        return Agent(
            config=self.agents_config['product_manager'],
            verbose=True,
            tools=[
                FileWriterTool(directory='./output/product_manager'),
                FileReadTool(),
                SerperDevTool()
            ]
        )

    @agent
    def ai_platform_architect(self) -> Agent:
        return Agent(
            config=self.agents_config['ai_platform_architect'],
            verbose=True,
            tools=[
                FileWriterTool(directory='./output/ai_platform_architect'),
                CodeDocsSearchTool(),
                GithubSearchTool(gh_token=os.getenv('GH_TOKEN')),
                SerperDevTool()
            ]
        )

    @agent
    def full_stack_lead(self) -> Agent:
        return Agent(
            config=self.agents_config['full_stack_lead'],
            verbose=True,
            tools=[
                FileWriterTool(directory='./output/full_stack_lead'),
                GithubSearchTool(gh_token=os.getenv('GH_TOKEN')),
                CodeDocsSearchTool(),
                SerperDevTool()
            ]
        )

    ###########################################################################
    # AGENTS - Design & Frontend
    ###########################################################################

    @agent
    def ui_ux_designer(self) -> Agent:
        return Agent(
            config=self.agents_config['ui_ux_designer'],
            verbose=True,
            tools=[
                FileWriterTool(directory='./output/ui_ux_designer'),
                WebsiteSearchTool(),
                SerperDevTool()
            ]
        )

    @agent
    def gamification_designer(self) -> Agent:
        return Agent(
            config=self.agents_config['gamification_designer'],
            verbose=True,
            tools=[
                FileWriterTool(directory='./output/gamification_designer'),
                SerperDevTool(),
                WebsiteSearchTool()
            ]
        )

    @agent
    def frontend_engineer(self) -> Agent:
        return Agent(
            config=self.agents_config['frontend_engineer'],
            verbose=True,
            tools=[
                FileWriterTool(directory='./output/frontend_engineer'),
                GithubSearchTool(gh_token=os.getenv('GH_TOKEN')),
                CodeDocsSearchTool(),
                SerperDevTool()
            ]
        )

    ###########################################################################
    # AGENTS - Backend & Data
    ###########################################################################

    @agent
    def backend_engineer(self) -> Agent:
        return Agent(
            config=self.agents_config['backend_engineer'],
            verbose=True,
            tools=[
                FileWriterTool(directory='./output/backend_engineer'),
                GithubSearchTool(gh_token=os.getenv('GH_TOKEN')),
                CodeDocsSearchTool(),
                SerperDevTool()
            ]
        )

    @agent
    def data_engineer(self) -> Agent:
        return Agent(
            config=self.agents_config['data_engineer'],
            verbose=True,
            tools=[
                FileWriterTool(directory='./output/data_engineer'),
                CodeDocsSearchTool(),
                GithubSearchTool(gh_token=os.getenv('GH_TOKEN')),
                SerperDevTool()
            ]
        )

    @agent
    def data_visualization_specialist(self) -> Agent:
        return Agent(
            config=self.agents_config['data_visualization_specialist'],
            verbose=True,
            tools=[
                FileWriterTool(
                    directory='./output/data_visualization_specialist'),
                SerperDevTool(),
                WebsiteSearchTool()
            ]
        )

    ###########################################################################
    # AGENTS - Operations & Quality
    ###########################################################################

    @agent
    def qa_engineer(self) -> Agent:
        return Agent(
            config=self.agents_config['qa_engineer'],
            verbose=True,
            tools=[
                FileWriterTool(directory='./output/qa_engineer'),
                FileReadTool(),
                CodeDocsSearchTool()
            ]
        )

    @agent
    def devops_engineer(self) -> Agent:
        return Agent(
            config=self.agents_config['devops_engineer'],
            verbose=True,
            tools=[
                FileWriterTool(directory='./output/devops_engineer'),
                GithubSearchTool(gh_token=os.getenv('GH_TOKEN')),
                CodeDocsSearchTool(),
                SerperDevTool()
            ]
        )

    @agent
    def security_engineer(self) -> Agent:
        return Agent(
            config=self.agents_config['security_engineer'],
            verbose=True,
            tools=[
                FileWriterTool(directory='./output/security_engineer'),
                GithubSearchTool(gh_token=os.getenv('GH_TOKEN')),
                SerperDevTool(),
                CodeDocsSearchTool()
            ]
        )

    @agent
    def technical_writer(self) -> Agent:
        return Agent(
            config=self.agents_config['technical_writer'],
            verbose=True,
            tools=[
                FileWriterTool(directory='./output/technical_writer'),
                FileReadTool(),
                DirectoryReadTool()
            ]
        )

    ###########################################################################
    # AGENTS - Community & Growth
    ###########################################################################

    @agent
    def open_source_mentor(self) -> Agent:
        return Agent(
            config=self.agents_config['open_source_mentor'],
            verbose=True,
            tools=[
                FileWriterTool(directory='./output/open_source_mentor'),
                GithubSearchTool(gh_token=os.getenv('GH_TOKEN')),
                SerperDevTool()
            ]
        )

    @agent
    def community_leader(self) -> Agent:
        return Agent(
            config=self.agents_config['community_leader'],
            verbose=True,
            tools=[
                FileWriterTool(directory='./output/community_leader'),
                SerperDevTool(),
                WebsiteSearchTool()
            ]
        )

    @agent
    def networking_specialist(self) -> Agent:
        return Agent(
            config=self.agents_config['networking_specialist'],
            verbose=True,
            tools=[
                FileWriterTool(directory='./output/networking_specialist'),
                SerperDevTool(),
                WebsiteSearchTool()
            ]
        )

    ###########################################################################
    # TASKS - Phase 1: Meta-Learning & Strategy
    ###########################################################################

    @task
    def design_personalized_learning_strategy(self) -> Task:
        return Task(
            config=self.tasks_config['design_personalized_learning_strategy'],
            verbose=True
        )

    @task
    def meta_learning_analysis(self) -> Task:
        return Task(
            config=self.tasks_config['meta_learning_analysis'],
            verbose=True
        )

    @task
    def learning_habit_coaching(self) -> Task:
        return Task(
            config=self.tasks_config['learning_habit_coaching'],
            verbose=True
        )

    ###########################################################################
    # TASKS - Phase 2: Technical AI/ML Mastery
    ###########################################################################

    @task
    def ai_curriculum_development(self) -> Task:
        return Task(
            config=self.tasks_config['ai_curriculum_development'],
            verbose=True
        )

    @task
    def project_portfolio_design(self) -> Task:
        return Task(
            config=self.tasks_config['project_portfolio_design'],
            verbose=True
        )

    @task
    def mlops_system_setup(self) -> Task:
        return Task(
            config=self.tasks_config['mlops_system_setup'],
            verbose=True
        )

    @task
    def ai_research_alignment(self) -> Task:
        return Task(
            config=self.tasks_config['ai_research_alignment'],
            verbose=True
        )

    ###########################################################################
    # TASKS - Phase 3: Career & Positioning
    ###########################################################################

    @task
    def career_readiness_plan(self) -> Task:
        return Task(
            config=self.tasks_config['career_readiness_plan'],
            verbose=True
        )

    @task
    def job_market_scan(self) -> Task:
        return Task(
            config=self.tasks_config['job_market_scan'],
            verbose=True
        )

    @task
    def mock_interview_program(self) -> Task:
        return Task(
            config=self.tasks_config['mock_interview_program'],
            verbose=True
        )

    @task
    def personal_brand_strategy(self) -> Task:
        return Task(
            config=self.tasks_config['personal_brand_strategy'],
            verbose=True
        )

    ###########################################################################
    # TASKS - Phase 4: Learning Platform Build
    ###########################################################################

    @task
    def platform_product_spec(self) -> Task:
        return Task(
            config=self.tasks_config['platform_product_spec'],
            verbose=True
        )

    @task
    def multi_agent_architecture_blueprint(self) -> Task:
        return Task(
            config=self.tasks_config['multi_agent_architecture_blueprint'],
            verbose=True
        )

    @task
    def technical_system_design(self) -> Task:
        return Task(
            config=self.tasks_config['technical_system_design'],
            verbose=True
        )

    @task
    def ui_ux_design(self) -> Task:
        return Task(
            config=self.tasks_config['ui_ux_design'],
            verbose=True
        )

    @task
    def gamification_system_design(self) -> Task:
        return Task(
            config=self.tasks_config['gamification_system_design'],
            verbose=True
        )

    @task
    def frontend_development(self) -> Task:
        return Task(
            config=self.tasks_config['frontend_development'],
            verbose=True
        )

    @task
    def backend_infrastructure(self) -> Task:
        return Task(
            config=self.tasks_config['backend_infrastructure'],
            verbose=True
        )

    @task
    def data_pipeline_build(self) -> Task:
        return Task(
            config=self.tasks_config['data_pipeline_build'],
            verbose=True
        )

    @task
    def ai_recommendation_system(self) -> Task:
        return Task(
            config=self.tasks_config['ai_recommendation_system'],
            verbose=True
        )

    @task
    def progress_analytics_dashboard(self) -> Task:
        return Task(
            config=self.tasks_config['progress_analytics_dashboard'],
            verbose=True
        )

    @task
    def qa_and_testing(self) -> Task:
        return Task(
            config=self.tasks_config['qa_and_testing'],
            verbose=True
        )

    @task
    def deployment_and_monitoring(self) -> Task:
        return Task(
            config=self.tasks_config['deployment_and_monitoring'],
            verbose=True
        )

    @task
    def security_and_privacy_audit(self) -> Task:
        return Task(
            config=self.tasks_config['security_and_privacy_audit'],
            verbose=True
        )

    @task
    def system_documentation(self) -> Task:
        return Task(
            config=self.tasks_config['system_documentation'],
            verbose=True
        )

    ###########################################################################
    # TASKS - Phase 5: Long-Term Growth, Community & Future-Proofing
    ###########################################################################

    @task
    def ai_trend_forecasting(self) -> Task:
        return Task(
            config=self.tasks_config['ai_trend_forecasting'],
            verbose=True
        )

    @task
    def open_source_contribution_plan(self) -> Task:
        return Task(
            config=self.tasks_config['open_source_contribution_plan'],
            verbose=True
        )

    @task
    def community_and_network_expansion(self) -> Task:
        return Task(
            config=self.tasks_config['community_and_network_expansion'],
            verbose=True
        )

    @task
    def high_value_networking_strategy(self) -> Task:
        return Task(
            config=self.tasks_config['high_value_networking_strategy'],
            verbose=True
        )

    ###########################################################################
    # CREW
    ###########################################################################

    @crew
    def crew(self) -> Crew:
        """Creates the TechStar crew"""
        # To learn how to add knowledge sources to your crew, check out the documentation:
        # https://docs.crewai.com/concepts/knowledge#what-is-knowledge

        return Crew(
            agents=self.agents,  # Automatically created by the @agent decorator
            tasks=self.tasks,  # Automatically created by the @task decorator
            process=Process.hierarchical,
            verbose=True,
            # Manager uses Opus 4 for superior reasoning and strategic coordination.
            # With 32 agents and 28 interdependent tasks, the manager must understand
            # complex dependencies, intelligently parallelize work, and synthesize outputs.
            # Opus 4's advanced planning capabilities justify the higher cost for this
            # critical orchestration role - getting task coordination right is essential.
            manager_llm="anthropic/claude-opus-4-20250514",
        )
