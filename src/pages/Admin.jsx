
import React, { useState } from 'react';
import projectsData from '../data/projects.json';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableBlock = ({ block, bIdx, sectionId, onRemove, onUpdate }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: block._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="bg-white p-4 rounded-xl border border-neutral-100 relative group">
      <div {...attributes} {...listeners} className="absolute left-2 top-2 p-1 cursor-grab active:cursor-grabbing text-neutral-300 hover:text-neutral-500">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16"></path></svg>
      </div>
      <button 
        onClick={() => onRemove(bIdx)}
        className="absolute top-2 right-2 text-neutral-300 hover:text-red-500 z-10"
      >
        &times;
      </button>
      
      <div className="pl-6">
        <p className="text-xs font-bold text-neutral-400 uppercase mb-2 select-none">{block.type} Block</p>
        
        {block.type === 'text' && (
          <textarea 
            className="w-full p-2 text-sm border border-neutral-200 rounded-lg"
            rows="3"
            placeholder="Enter text..."
            value={block.content}
            onChange={(e) => onUpdate(bIdx, 'content', e.target.value)}
          />
        )}
        
        {block.type === 'image' && (
          <div className="space-y-2">
            <input 
              type="text" 
              className="w-full p-2 text-sm border border-neutral-200 rounded-lg"
              placeholder="Image URL"
              value={block.url}
              onChange={(e) => onUpdate(bIdx, 'url', e.target.value)}
            />
             <input 
              type="text" 
              className="w-full p-2 text-sm border border-neutral-200 rounded-lg"
              placeholder="Caption (optional)"
              value={block.caption}
              onChange={(e) => onUpdate(bIdx, 'caption', e.target.value)}
            />
          </div>
        )}

       {block.type === 'grid' && (
          <div className="space-y-2">
            <p className="text-xs text-neutral-500 select-none">Add URLs separated by commas</p>
            <textarea 
              className="w-full p-2 text-sm border border-neutral-200 rounded-lg"
              placeholder="url1, url2..."
              value={block.rawImages} 
              onChange={(e) => {
                 onUpdate(bIdx, 'rawImages', e.target.value);
                 onUpdate(bIdx, 'images', e.target.value.split(',').map(url => ({ url: url.trim(), caption: '' })));
              }}
            />
          </div>
        )}

        {block.type === 'lottie' && (
          <div className="space-y-2">
            <input 
              type="text" 
              className="w-full p-2 text-sm border border-neutral-200 rounded-lg"
              placeholder="Lottie JSON URL (e.g. /lottie/anim.json)"
              value={block.url}
              onChange={(e) => onUpdate(bIdx, 'url', e.target.value)}
            />
            <div className="flex gap-2">
               <input 
                type="text" 
                className="w-full p-2 text-sm border border-neutral-200 rounded-lg"
                placeholder="Caption (optional)"
                value={block.caption}
                onChange={(e) => onUpdate(bIdx, 'caption', e.target.value)}
              />
               <input 
                type="text" 
                className="w-full p-2 text-sm border border-neutral-200 rounded-lg"
                placeholder="Height (e.g. h-96)"
                value={block.height}
                onChange={(e) => onUpdate(bIdx, 'height', e.target.value)}
              />
            </div>
          </div>
        )}

        {block.type === 'comparison' && (
          <div className="space-y-2">
             <div className="flex gap-2">
                <input 
                  type="text" 
                  className="w-full p-2 text-sm border border-neutral-200 rounded-lg"
                  placeholder="Before Image URL"
                  value={block.beforeImage}
                  onChange={(e) => onUpdate(bIdx, 'beforeImage', e.target.value)}
                />
                <input 
                  type="text" 
                  className="w-full p-2 text-sm border border-neutral-200 rounded-lg"
                  placeholder="After Image URL"
                  value={block.afterImage}
                  onChange={(e) => onUpdate(bIdx, 'afterImage', e.target.value)}
                />
             </div>
             <textarea 
               className="w-full p-2 text-sm border border-neutral-200 rounded-lg"
               rows="2"
               placeholder="Description..."
               value={block.content}
               onChange={(e) => onUpdate(bIdx, 'content', e.target.value)}
             />
          </div>
        )}
      </div>
    </div>
  );
};

const SortableSection = ({ section, sIdx, onRemove, onUpdate, onBlockAdd, onBlockRemove, onBlockUpdate }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200 relative group mb-6">
       <div {...attributes} {...listeners} className="absolute left-1/2 -top-3 -translate-x-1/2 bg-white border border-neutral-200 px-3 py-1 rounded-full cursor-grab active:cursor-grabbing text-neutral-400 hover:text-black shadow-sm flex gap-2 items-center z-10">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16"></path></svg>
        <span className="text-xs font-bold uppercase tracking-wider">Drag Section</span>
      </div>

      <button 
        onClick={() => onRemove(sIdx)}
        className="absolute top-4 right-4 text-neutral-400 hover:text-red-500 p-2 z-10"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
      </button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 mt-2">
        <InputGroup 
          label={`Section ${sIdx + 1} ID`} 
          value={section.id} 
          placeholder="e.g., user-research"
          onChange={(e) => onUpdate(sIdx, 'id', e.target.value)} 
         />
        <InputGroup 
          label="Section Title" 
          value={section.title} 
          placeholder="e.g., User Research"
          onChange={(e) => onUpdate(sIdx, 'title', e.target.value)} 
         />
      </div>

      <div className="space-y-3 pl-4 border-l-2 border-neutral-200 min-h-[50px]">
        <SortableContext 
          items={section.blocks.map(b => b._id)} 
          strategy={verticalListSortingStrategy}
        >
          {section.blocks?.map((block, bIdx) => (
            <SortableBlock 
              key={block._id} 
              block={block} 
              bIdx={bIdx} 
              sectionId={section.id}
              onRemove={() => onBlockRemove(sIdx, bIdx)}
              onUpdate={(idx, field, val) => onBlockUpdate(sIdx, idx, field, val)}
            />
          ))}
        </SortableContext>

        <div className="flex gap-2 pt-2">
           <button onClick={() => onBlockAdd(sIdx, 'text')} className="px-3 py-1.5 text-xs bg-neutral-100 hover:bg-neutral-200 rounded-lg font-medium">+ Text</button>
           <button onClick={() => onBlockAdd(sIdx, 'image')} className="px-3 py-1.5 text-xs bg-neutral-100 hover:bg-neutral-200 rounded-lg font-medium">+ Image</button>
           <button onClick={() => onBlockAdd(sIdx, 'grid')} className="px-3 py-1.5 text-xs bg-neutral-100 hover:bg-neutral-200 rounded-lg font-medium">+ Grid</button>
           <button onClick={() => onBlockAdd(sIdx, 'lottie')} className="px-3 py-1.5 text-xs bg-neutral-100 hover:bg-neutral-200 rounded-lg font-medium">+ Lottie</button>
           <button onClick={() => onBlockAdd(sIdx, 'comparison')} className="px-3 py-1.5 text-xs bg-neutral-100 hover:bg-neutral-200 rounded-lg font-medium">+ Compare</button>
        </div>
      </div>
    </div>
  );
};

const Admin = () => {
  const [projects, setProjects] = useState(projectsData);
  const [activeTab, setActiveTab] = useState('list'); // 'list' or 'add'
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    company: '',
    role: '',
    type: 'UI/UX Design',
    gradient: 'bg-[#F9F9F9]',
    duration: '',
    width: 'w-full',
    height: 'h-[500px]',
    coverImage: '',
    summary: '',
    tools: '',
    collaborators: '',
    lottie: '',
    customSections: [],
  });

  const generateId = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setFormData(prev => ({
      ...prev,
      title,
      id: !prev.id || prev.id === generateId(prev.title) ? generateId(title) : prev.id
    }));
  };

  const loadProject = (project) => {
     // Convert legacy sections to unified "customSections" format
     let unifiedSections = [];

     // UI Designs
     if (project.sections?.uiDesigns?.enabled) {
       const blocks = (project.sections.uiDesigns.images || []).map(img => ({
         _id: crypto.randomUUID(),
         type: 'image',
         url: img.url,
         caption: img.caption,
         width: 'full', // Default to full width for UI designs
         description: img.description // carrying over legacy desc
       }));
       unifiedSections.push({ id: 'ui-designs', title: 'UI Designs', blocks });
     }

     // Wireframes
     if (project.sections?.wireframes?.enabled) {
        // Wireframes were a single grid.
        // We can create one Grid block or multiple. Let's create one Grid block.
        if (project.sections.wireframes.images?.length > 0) {
           unifiedSections.push({
             id: 'wireframes',
             title: 'Wireframes',
             blocks: [{
               _id: crypto.randomUUID(),
               type: 'grid',
               images: project.sections.wireframes.images.map(img => ({ url: img.url, caption: img.caption })),
               rawImages: project.sections.wireframes.images.map(img => img.url).join(', '),
               columns: 2
             }]
           });
        }
     }

     // Redesign
     if (project.sections?.redesign?.enabled) {
        unifiedSections.push({
          id: 'redesign',
          title: 'Redesign Exploration',
          blocks: [{
            _id: crypto.randomUUID(),
            type: 'comparison',
            beforeImage: project.sections.redesign.beforeImage,
            afterImage: project.sections.redesign.afterImage,
            content: project.sections.redesign.description
          }]
        });
     }

     // Append existing custom sections
     if (project.customSections) {
        const hydratedCustom = project.customSections.map(section => ({
         ...section,
         blocks: (section.blocks || []).map(block => {
           const blockWithId = { ...block, _id: block._id || crypto.randomUUID() };
           if (block.type === 'grid' && block.images) {
             return { ...blockWithId, rawImages: block.images.map(img => img.url).join(', ') };
           }
           return blockWithId;
         })
       }));
       unifiedSections = [...unifiedSections, ...hydratedCustom];
     } else if (Array.isArray(project.sections)) {
        // If the project is ALREADY in the new unified format (array), use it directly
       const hydratedSections = project.sections.map(section => ({
         ...section,
         blocks: (section.blocks || []).map(block => {
           const blockWithId = { ...block, _id: block._id || crypto.randomUUID() };
           if (block.type === 'grid' && block.images) {
             return { ...blockWithId, rawImages: block.images.map(img => img.url).join(', ') };
           }
           return blockWithId;
         })
       }));
       unifiedSections = hydratedSections;
     }

     setFormData({
       ...project,
       tools: Array.isArray(project.tools) ? project.tools.join(', ') : project.tools,
       collaborators: Array.isArray(project.collaborators) ? project.collaborators.join(', ') : project.collaborators,
       customSections: unifiedSections,
     });
     setActiveTab('edit');
  };

  const resetForm = () => {
    setFormData({
      id: '',
      title: '',
      company: '',
      role: '',
      type: 'UI/UX Design',
      gradient: 'bg-[#F9F9F9]',
      duration: '',
      width: 'w-full',
      height: 'h-[500px]',
      coverImage: '',
      summary: '',
      tools: '',
      collaborators: '',
      lottie: '',
      customSections: [],
    });
    setActiveTab('add');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateJSON = () => {
    // Prepare sections
    let finalSections = [];
    if (formData.customSections) {
      finalSections = formData.customSections.map(s => ({
        ...s,
        blocks: s.blocks.map(({ _id, rawImages, ...rest }) => rest)
      }));
    }

    const newProject = {
      ...formData,
      tools: formData.tools.split(',').map(t => t.trim()),
      collaborators: formData.collaborators.split(',').map(c => c.trim()),
      sections: finalSections
    };

    delete newProject.customSections; // Cleanup internal state name
    
    // Clean up large objects (like Lottie imports) to prevent massive JSON dumps
    // BUT keep it if it is a string path (new behavior)
    if (typeof newProject.lottie === 'object' && newProject.lottie !== null) {
      delete newProject.lottie;
    }

    const jsonString = JSON.stringify(newProject, null, 2);
    // Remove quotes from keys to match the project file style (e.g. "id": -> id:)
    return jsonString.replace(/"([a-zA-Z0-9_]+)":/g, '$1:');
  };

  const copyToClipboard = () => {
    const json = generateJSON();
    navigator.clipboard.writeText(json + ',');
    alert('Project configuration copied! Paste it into src/data/projects.json');
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-8 pt-24 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar / Project List */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100">
            <h2 className="text-xl font-bold text-neutral-900 mb-4">Projects</h2>
            <div className="space-y-3">
              <button 
                onClick={resetForm}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'add' ? 'bg-black text-white shadow-md' : 'bg-neutral-50 text-neutral-600 hover:bg-neutral-100'}`}
              >
                + Add New Project
              </button>
              <div className="h-px bg-neutral-100 my-2"></div>
              <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                {projects.map(p => (
                  <div key={p.id} 
                    onClick={() => loadProject(p)}
                    className="p-3 rounded-xl bg-neutral-50 border border-neutral-100 text-sm text-neutral-700 font-medium cursor-pointer hover:bg-neutral-100 hover:border-neutral-200 transition-all"
                  >
                    {p.title}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content / Form */}
        <div className="lg:col-span-3">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden"
          >
            <div className="p-8 border-b border-neutral-100 flex justify-between items-center bg-neutral-50/50">
              <div>
                <h1 className="text-2xl font-bold text-neutral-900">Add Project Details</h1>
                <p className="text-neutral-500 mt-1">Create a new entry for your portfolio.</p>
              </div>
              <button 
                onClick={copyToClipboard}
                className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-full shadow-lg shadow-green-600/20 transition-all active:scale-95 flex items-center gap-2"
              >
                <span>Copy JSON Code</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
              </button>
            </div>

            <div className="p-8">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputGroup label="Project ID (unique ref)" name="id" placeholder="e.g., travel-app-redesign" value={formData.id} onChange={handleChange} />
                  <InputGroup label="Title" name="title" placeholder="e.g., Travel App Redesign" value={formData.title} onChange={handleTitleChange} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputGroup label="Company / Client" name="company" placeholder="e.g., Personal Project" value={formData.company} onChange={handleChange} />
                  <InputGroup label="Role" name="role" placeholder="e.g., UI/UX Designer" value={formData.role} onChange={handleChange} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <InputGroup label="Type" name="type" placeholder="e.g., Mobile App" value={formData.type} onChange={handleChange} />
                  <InputGroup label="Duration" name="duration" placeholder="e.g., 4 Weeks" value={formData.duration} onChange={handleChange} />
                  <InputGroup label="Gradient Class" name="gradient" placeholder="e.g., bg-[#FBFBFB]" value={formData.gradient} onChange={handleChange} />
                </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputGroup label="Card Width" name="width" placeholder="w-full" value={formData.width} onChange={handleChange} />
                  <InputGroup label="Card Height" name="height" placeholder="h-[500px]" value={formData.height} onChange={handleChange} />
                </div>

                <InputGroup label="Cover Image URL/Path" name="coverImage" placeholder="/img/project-cover.png" value={formData.coverImage} onChange={handleChange} />
                <InputGroup label="Cover Lottie URL (optional)" name="lottie" placeholder="/lottie/animation.json" value={formData.lottie || ''} onChange={handleChange} />
                
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Summary</label>
                  <textarea 
                    name="summary"
                    rows="3"
                    className="w-full px-4 py-3 rounded-xl bg-neutral-50 border-neutral-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all resize-none"
                    placeholder="Brief description of the project..."
                    value={formData.summary}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputGroup label="Tools (comma separated)" name="tools" placeholder="Figma, React, etc." value={formData.tools} onChange={handleChange} />
                   <InputGroup label="Collaborators (comma separated)" name="collaborators" placeholder="Alex Chen, Sarah Jones" value={formData.collaborators} onChange={handleChange} />
                </div>
                
                <ContentBuilder formData={formData} setFormData={setFormData} />



                <div className="pt-6 border-t border-neutral-100">
                  <div className="bg-yellow-50 text-yellow-800 text-sm p-4 rounded-xl flex gap-3 items-start">
                    <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <p>
                      <strong>Note:</strong> Due to browser security, this form cannot directly write to your file system. 
                      Fill out the details above, click "Copy JSON Code", and paste it into the <code>src/data/projects.json</code> file array.
                    </p>
                  </div>
                </div>

              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const ContentBuilder = ({ formData, setFormData }) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const sections = formData.customSections;

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (!over) return;

    // Move Section
    if (active.id !== over.id && sections.some(s => s.id === active.id)) {
      const oldIndex = sections.findIndex((s) => s.id === active.id);
      const newIndex = sections.findIndex((s) => s.id === over.id);
      setFormData(prev => ({ ...prev, customSections: arrayMove(prev.customSections, oldIndex, newIndex) }));
      return;
    }
    
    // Move Block (This is trickier with multiple lists, assuming global unique IDs for blocks)
    // dnd-kit handles this better if we find which container the blocks belong to.
    
    // A simplified approach for single-list ordering within sections
    // If active ID is found inside a section, and over ID is in the SAME section:
    const activeSection = sections.find(s => s.blocks.some(b => b._id === active.id));
    const overSection = sections.find(s => s.blocks.some(b => b._id === over.id));
    
    if (activeSection && overSection && activeSection.id === overSection.id) {
       const sectionIndex = sections.findIndex(s => s.id === activeSection.id);
       const oldBlockIndex = activeSection.blocks.findIndex(b => b._id === active.id);
       const newBlockIndex = activeSection.blocks.findIndex(b => b._id === over.id);
       
       const newSections = [...sections];
       newSections[sectionIndex].blocks = arrayMove(newSections[sectionIndex].blocks, oldBlockIndex, newBlockIndex);
       setFormData(prev => ({ ...prev, customSections: newSections }));
    }
  };

  const updateSection = (sIdx, field, val) => {
    const newSections = [...sections];
    newSections[sIdx][field] = val;
    // Auto-update ID if title changes (optional, maybe annoying if user set custom ID)
    if (field === 'title') {
       newSections[sIdx].id = val.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }
    setFormData(prev => ({ ...prev, customSections: newSections }));
  };

  const removeSection = (sIdx) => {
    setFormData(prev => ({ ...prev, customSections: sections.filter((_, i) => i !== sIdx) }));
  };

  const addBlock = (sIdx, type) => {
     const newSections = [...sections];
     newSections[sIdx].blocks.push({ 
       _id: crypto.randomUUID(), 
       type, 
       content: '', 
       url: '', 
       caption: '', 
       width: 'full',
       height: '',
       rawImages: '',
       images: []  
     });
     setFormData(prev => ({ ...prev, customSections: newSections }));
  };

  const removeBlock = (sIdx, bIdx) => {
     const newSections = [...sections];
     newSections[sIdx].blocks = newSections[sIdx].blocks.filter((_, i) => i !== bIdx);
     setFormData(prev => ({ ...prev, customSections: newSections }));
  };

  const updateBlock = (sIdx, bIdx, field, val) => {
     const newSections = [...sections];
     newSections[sIdx].blocks[bIdx][field] = val;
     setFormData(prev => ({ ...prev, customSections: newSections }));
  };

  return (
    <div className="pt-8 border-t border-neutral-100">
      <h3 className="text-lg font-bold text-neutral-900 mb-4">Content Builder</h3>
      
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="space-y-6">
          <SortableContext 
            items={sections.map(s => s.id)}
            strategy={verticalListSortingStrategy}
          >
            {sections.map((section, sIdx) => (
              <SortableSection 
                key={section.id} 
                section={section} 
                sIdx={sIdx}
                onRemove={removeSection}
                onUpdate={updateSection}
                onBlockAdd={addBlock}
                onBlockRemove={removeBlock}
                onBlockUpdate={updateBlock}
              />
            ))}
          </SortableContext>
        </div>
      </DndContext>

      <button 
        onClick={() => {
           setFormData(prev => ({ 
             ...prev, 
             customSections: [...prev.customSections, { id: `section-${prev.customSections.length + 1}`, title: 'New Section', blocks: [] }] 
           }));
        }}
        className="w-full mt-6 py-4 border-2 border-dashed border-neutral-200 rounded-2xl text-neutral-400 font-bold hover:text-neutral-600 hover:border-neutral-300 transition-all"
      >
        + Add New Section
      </button>
    </div>
  );
};

const InputGroup = ({ label, name, placeholder, value, onChange }) => (
  <div className="space-y-2">
    <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500">{label}</label>
    <input 
      type="text" 
      name={name}
      className="w-full px-4 py-3 rounded-xl bg-neutral-50 border-neutral-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);

export default Admin;
