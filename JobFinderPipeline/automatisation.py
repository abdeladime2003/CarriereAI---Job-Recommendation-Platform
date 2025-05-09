from airflow import DAG
from airflow.operators.python_operator import PythonOperator
from airflow.operators.dummy_operator import DummyOperator
from datetime import datetime
import subprocess
import os

# Définir les chemins de base
base_path = os.path.dirname(os.path.abspath(__file__))
log_file = os.path.join(base_path, 'logs', 'pipeline.log')
scraper1 = os.path.join(base_path, 'scraping_emploi_ma', 'main.py')
scraper2 = os.path.join(base_path, 'scraping_rekrute_com', 'main.py')
scala_project_path = os.path.join(base_path, 'spark_transformation')

# Fonction pour enregistrer les messages dans les logs
def log_message(message, log_type):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    log_entry = f"[{timestamp}] [{log_type}] {message}"
    with open(log_file, 'a') as log:
        log.write(log_entry + '\n')
    print(log_entry)

# Fonction de scraping
def scraping_site1():
    log_message("Démarrage du scraping site 1...", "INFO")
    result = subprocess.run(['python', scraper1], capture_output=True)
    if result.returncode == 0:
        log_message("Scraping site 1 terminé avec succès !", "SUCCESS")
    else:
        log_message("Échec du scraping site 1 !", "ERROR")
        raise Exception("Échec du scraping site 1")

def scraping_site2():
    log_message("Démarrage du scraping site 2...", "INFO")
    result = subprocess.run(['python', scraper2], capture_output=True)
    if result.returncode == 0:
        log_message("Scraping site 2 terminé avec succès !", "SUCCESS")
    else:
        log_message("Échec du scraping site 2 !", "ERROR")
        raise Exception("Échec du scraping site 2")

# Fonction pour exécuter SBT
def run_sbt():
    log_message("Démarrage du traitement Scala...", "INFO")
    
    # Vérifier si SBT est installé
    if not shutil.which("sbt"):
        log_message("Erreur : SBT n'est pas installé ou accessible dans le PATH.", "ERROR")
        raise Exception("SBT n'est pas installé ou accessible dans le PATH.")
    
    log_message("Exécution de SBT en cours...", "INFO")
    result = subprocess.run(['sbt', 'run'], cwd=scala_project_path, capture_output=True)
    if result.returncode == 0:
        log_message("Pipeline exécuté avec succès !", "SUCCESS")
    else:
        log_message("Échec de l'exécution de SBT !", "ERROR")
        raise Exception("Échec de l'exécution de SBT")

# Définir le DAG
default_args = {
    'owner': 'airflow',
    'start_date': datetime(2025, 5, 6),
    'retries': 1,
}

dag = DAG(
    'data_pipeline',
    default_args=default_args,
    description='Un pipeline de scraping et de transformation avec Airflow',
    schedule_interval=None,  # Ce DAG peut être exécuté manuellement
)

# Définir les tâches du DAG
start_task = DummyOperator(
    task_id='start',
    dag=dag,
)

scraping_task1 = PythonOperator(
    task_id='scraping_site1',
    python_callable=scraping_site1,
    dag=dag,
)

scraping_task2 = PythonOperator(
    task_id='scraping_site2',
    python_callable=scraping_site2,
    dag=dag,
)

sbt_task = PythonOperator(
    task_id='run_sbt',
    python_callable=run_sbt,
    dag=dag,
)

end_task = DummyOperator(
    task_id='end',
    dag=dag,
)

# Définir les dépendances du DAG
start_task >> scraping_task1 >> scraping_task2 >> sbt_task >> end_task
# teste
data_pipeline.test()