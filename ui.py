import wx

# UNDERSCORE DEFINITIONS
#     - _ = Protected
#     - __ = Private

class BaseGUI(wx.Frame):
    def __init__(self, title):
        super().__init__(parent=None,
                         title=title,
                         size=(100, 100),
                         style=wx.DEFAULT_FRAME_STYLE ^ wx.RESIZE_BORDER)

    def _StartGridBuild(self):
        self.panel = wx.Panel(self)
        self.grid = wx.GridBagSizer(vgap=10, hgap=10)
        
        # Handling dynamic row assignment
        self.__next_row = 0

    def _NextRow(self) -> int:
        row = self.__next_row
        self.__next_row += 1
        return row
    
    def __ResolvePosition(self, pos : tuple[int, int], span: tuple[int, int]):
        if pos is None:
            return (self._NextRow(), 0)
        # Keep cursor in sync when a manual pos is used
        self.__next_row = max(self.__next_row, pos[0] + span[0])
        return pos

    def _EndGridBuild(self):
        self.panel.SetSizerAndFit(self.grid)
        frame_sizer = wx.BoxSizer(wx.VERTICAL)
        frame_sizer.Add(self.panel, 0, wx.ALL | wx.ALIGN_CENTER_HORIZONTAL, 15)
        
        self.SetSizerAndFit(frame_sizer)
        self.Centre()

    def _AddText(self, text : str, pos : tuple[int, int] | None = None, span : tuple[int, int] = (1, 1)):
        pos = self.__ResolvePosition(pos, span)
        self.grid.Add(
            wx.StaticText(self.panel, label=text),
            pos=(pos[0], pos[1]),
            span=(span[0], span[1]),
            flag=wx.ALIGN_CENTER
        )
        
    def _AddTextbox(self, pos : tuple[int, int] | None = None, span : tuple[int, int] = (1, 1)):
        pos = self.__ResolvePosition(pos, span)
        self.grid.Add(
            wx.TextCtrl(self.panel, style=wx.TE_PROCESS_ENTER), 
            pos=(pos[0], pos[1]),
            span=(span[0], span[1]),
            flag=wx.ALIGN_CENTER
        ) 
    
    def _AddButton(self, text : str, pos : tuple[int, int] | None = None, span : tuple[int, int] = (1, 1), event : callable = None) -> wx.Button:
        pos = self.__ResolvePosition(pos, span)
        button = wx.Button(self.panel, label=text)
        self.grid.Add(
                button,
                pos=(pos[0], pos[1]),
                span=(span[0], span[1]),
                flag=wx.ALIGN_CENTER
        )
        if event:
            button.Bind(wx.EVT_BUTTON, event)
        return button
    
    def _AddDivider(self, pos : tuple[int, int] | None = None, span : tuple[int, int] = (1, 1), vertical : bool = False):
        pos = self.__ResolvePosition(pos, span)
        style = wx.LI_VERTICAL if vertical else wx.LI_HORIZONTAL
        line = wx.StaticLine(self.panel, style=style)
        self.grid.Add(
            line,
            pos=(pos[0], pos[1]),
            span=(span[0], span[1]),
            flag=wx.EXPAND | wx.ALIGN_CENTER_VERTICAL
        )
        return line
        

class DashboardGUI(BaseGUI):
    def __init__(self, user_id : int):
        super().__init__("GymPro: Dashboard")
        self.user_id = user_id
        
        self._StartGridBuild()
        
        
        self._AddButton("Membership Management")
        self._AddButton("Parking Management")
        self._AddButton("Book a Session")
        self._AddButton("Delete Account ")
        
        self._EndGridBuild()

# PARENT ROOT GUI
class WelcomeGUI(BaseGUI):
    def __init__(self):
        # ^ is the Bitwise XOR operation. By XORing default frame style with resizing we remove resizing.
        super().__init__("GymPro: Welcome")
        
        self._StartGridBuild()
        
        self._AddText("Welcome to GymPro", (0, 0), (1, 2))
        
        self._AddText("Login: ", (1, 0))
        self._AddTextbox((1, 1))
        
        self._AddText("Password: ", (2, 0))
        self._AddTextbox((2, 1))
        
        widget_login_button = self._AddButton("Login / Register", (3, 0), (1, 2), event=self._onLoginButtonPress)

        self._EndGridBuild()
    
    def _onLoginButtonPress(self, event):
        # Jamie: Implement user login / register here
        
        # Once the user is logged in / registered, run this code.
        # in DashboardGUI() pass in the user ID returned by the database.
        self.next_gui = DashboardGUI(0)
        self.next_gui.Show()
        self.Destroy()
        