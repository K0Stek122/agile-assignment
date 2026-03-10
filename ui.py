import wx

class Gui(wx.Frame):
    def __init__(self, title):
        super().__init__(parent=None, title=title, size=(400, 400))