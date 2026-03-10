import argparse
from sqlite import SQLite
from ui import WelcomeGUI
import wx

db_conn = None

def setup_arguments() -> argparse.Namespace:
    parser = argparse.ArgumentParser(prog="agile-assignment", description="App for gym membership management.")
    
    parser.add_argument('mode', choices=['cli', 'gui'], help="Run the app in CLI or GUI mode.")
    
    return parser.parse_args()

def setup_database():
    db_conn = SQLite("db.db")
    db_conn.execute("CREATE TABLE users (id INTEGER PRIMARY KEY, Name TEXT)")

def run_cli():
    pass

def run_gui():
    app = wx.App()
    gui = WelcomeGUI()
    gui.Show(True)
    app.MainLoop()

if __name__ == "__main__":
    args = setup_arguments() 
    setup_database()
    if args.mode == 'cli':
        run_cli()
    else:
        run_gui()