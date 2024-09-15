import pyodbc

def conexao_banco_dados():
    conexao = pyodbc.connect(
        'DRIVER={SQL Server};'
        'SERVER=NOTEACT09\SQLEXPRESS;'
        'DATABASE=GestaoBiblioteca;'
    )
    return conexao
