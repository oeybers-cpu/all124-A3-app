import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Download, Mail, Save, FileText } from 'lucide-react'
import './App.css'

function App() {
  const [notes, setNotes] = useState('')
  const [savedNotes, setSavedNotes] = useState('')

  const assignmentContent = `ALL 124 - Assignment 3: Team Argumentation Presentation
Due: 31 October | Weight: 30 marks | Format: In-class or Digital Narrative Presentation

Instructions:
Choose ONE theme from Assignment 2 (Unemployment, Corruption, Entrepreneurship, etc.). Form a team of 3–5 students.

Develop a structured argumentative presentation taking a clear position on a debatable issue within your chosen theme.

Requirements:
1. Use the articles from Assignment 2 as your primary evidence.
2. Cite sources using Harvard style (in-slide or in-narrative).
3. Include at least one visual (graph, chart, or diagram) to support your argument; this can be GenAI.
4. Acknowledge and refute one credible counterargument.
5. Ensure equal contribution from all team members.

Evaluation Criteria (30 marks total):
a) Clarity and strength of argument (8)
b) Use of evidence from required texts (6)
c) Visual aid effectiveness (5)
d) Acknowledgement and rebuttal of counterarguments (5)
e) Team coordination and contribution (4)
f) Strong, concise conclusion (2)

Format:
• Max 8-10 minutes presentation
• Submit slides or digital narrative link via clickUP (Turnitin-enabled)
• Presentation should be uncluttered and all text should be clearly visible.

Extra credit:
Include x2 examples of meaningful and effective translanguaging that supports both the written text and the graphic or image.`

  const handleSaveNotes = () => {
    setSavedNotes(notes)
    alert('Notes saved successfully!')
  }

  const handleDownloadNotes = () => {
    const element = document.createElement('a')
    const file = new Blob([notes], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = 'assignment_notes.txt'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const handleEmailNotes = () => {
    const subject = encodeURIComponent('Assignment 3 Notes')
    const body = encodeURIComponent(notes)
    const mailtoUrl = `mailto:?subject=${subject}&body=${body}`
    window.open(mailtoUrl)
  }

  const handleClearNotes = () => {
    if (window.confirm('Are you sure you want to clear all notes?')) {
      setNotes('')
    }
  }

  return (
    <div className="assignment-container">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary mb-2">Assignment Notes App</h1>
        <p className="text-lg text-muted-foreground">Read the assignment instructions and take notes</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assignment Instructions Section */}
        <div className="assignment-content">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-semibold text-primary">Assignment Instructions</h2>
          </div>
          <div className="prose prose-sm max-w-none">
            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground">
              {assignmentContent}
            </pre>
          </div>
        </div>

        {/* Notes Section */}
        <div className="notes-section">
          <div className="flex items-center gap-2 mb-4">
            <Save className="w-6 h-6 text-accent" />
            <h2 className="text-2xl font-semibold text-accent">Your Notes</h2>
          </div>
          
          <textarea
            className="notes-textarea"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Start taking notes about the assignment here...

You can write about:
• Your chosen theme
• Team members and their roles
• Key arguments and evidence
• Visual aids ideas
• Counterarguments to address
• Presentation structure
• Important deadlines and requirements"
          />

          <div className="button-group">
            <Button 
              onClick={handleSaveNotes}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Notes
            </Button>
            
            <Button 
              onClick={handleDownloadNotes}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              disabled={!notes.trim()}
            >
              <Download className="w-4 h-4 mr-2" />
              Download as .txt
            </Button>
            
            <Button 
              onClick={handleEmailNotes}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
              disabled={!notes.trim()}
            >
              <Mail className="w-4 h-4 mr-2" />
              Email Notes
            </Button>
            
            <Button 
              onClick={handleClearNotes}
              variant="outline"
              className="border-destructive text-destructive hover:bg-destructive hover:text-white"
              disabled={!notes.trim()}
            >
              Clear Notes
            </Button>
          </div>

          {savedNotes && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-green-800">
                ✓ Notes saved! Last saved: {new Date().toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </div>

      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>Use this app to understand the assignment requirements and organize your thoughts.</p>
        <p>Remember to save your notes regularly and download them as a backup.</p>
      </footer>
    </div>
  )
}

export default App

