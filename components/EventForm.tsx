'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createEvent, updateEvent, uploadImage } from '@/app/actions';
import { Plus, Trash2, Calendar, MapPin, Type, AlignLeft, Image as ImageIcon, Users, Clock, Loader2, Save, Send, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EventFormProps {
  initialData?: any;
  eventId?: string;
}

export default function EventForm({ initialData, eventId }: EventFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    longDescription: initialData?.longDescription || '',
    bannerImage: initialData?.bannerImage || '',
    type: initialData?.type || 'hackathon',
    locationType: initialData?.locationType || 'online',
    location: initialData?.location || '',
    date: initialData?.date ? new Date(initialData.date).toISOString().slice(0, 16) : '',
    status: initialData?.status || 'published',
    capacity: initialData?.capacity || 100,
  });

  const [speakers, setSpeakers] = useState<any[]>(initialData?.speakers || []);
  const [schedules, setSchedules] = useState<any[]>(initialData?.schedules || []);
  const [uploading, setUploading] = useState<string | null>(null);

  const handleFileUpload = async (file: File, type: 'banner' | 'speaker', index?: number) => {
    setUploading(type === 'banner' ? 'banner' : `speaker-${index}`);
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const res = await uploadImage(formData);
      if (res.success && res.url) {
        if (type === 'banner') {
          setFormData({ ...formData, bannerImage: res.url });
        } else if (index !== undefined) {
          updateSpeaker(index, 'image', res.url);
        }
      } else {
        alert(res.message || 'Upload failed');
      }
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    } finally {
      setUploading(null);
    }
  };

  const addSpeaker = () => setSpeakers([...speakers, { name: '', designation: '', image: '' }]);
  const removeSpeaker = (index: number) => setSpeakers(speakers.filter((_, i) => i !== index));
  const updateSpeaker = (index: number, field: string, value: string) => {
    const updated = [...speakers];
    updated[index][field] = value;
    setSpeakers(updated);
  };

  const addSchedule = () => setSchedules([...schedules, { time: '', title: '', description: '' }]);
  const removeSchedule = (index: number) => setSchedules(schedules.filter((_, i) => i !== index));
  const updateSchedule = (index: number, field: string, value: string) => {
    const updated = [...schedules];
    updated[index][field] = value;
    setSchedules(updated);
  };

  const handleSubmit = async (status: string) => {
    setLoading(true);
    const finalData = { ...formData, status, speakers, schedules };
    
    try {
      if (eventId) {
        await updateEvent(eventId, finalData);
      } else {
        await createEvent(finalData);
      }
      router.push('/organizer/events');
      router.refresh();
    } catch (err) {
      console.error(err);
      alert('Operation failed. Check logs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 pb-20">
      <div className="grid lg:grid-cols-[1fr_350px] gap-12">
        <div className="space-y-12">
          {/* Basic Info Section */}
          <section className="p-8 md:p-10 rounded-[2.5rem] bg-[#0c1222]/50 border border-white/5 space-y-8">
            <h3 className="text-xl font-bold flex items-center gap-3">
              <Type className="text-cyan-400" /> Basic Information
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2">Event Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Cyberphunk Hackathon 2026"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white text-lg focus:outline-none focus:border-cyan-500/50 transition-all"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2">Event Type</label>
                    <select 
                      className="w-full bg-[#0c1222] border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-cyan-500/50 appearance-none"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    >
                      <option value="hackathon">Hackathon</option>
                      <option value="workshop">Workshop</option>
                      <option value="meetup">Meetup</option>
                    </select>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2">Date & Time</label>
                    <input 
                      type="datetime-local" 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-cyan-500/50 transition-all"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                     <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2">Total Capacity (Tickets)</label>
                    <input 
                      type="number" 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-cyan-500/50 transition-all"
                      value={formData.capacity}
                      onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) || 0 })}
                    />
                 </div>
              </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2">Short Description</label>
                <textarea 
                  rows={3}
                  placeholder="A brief catchphrase for the event cards..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-cyan-500/50 transition-all resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </div>
          </section>

          {/* Speakers Section */}
          <section className="p-8 md:p-10 rounded-[2.5rem] bg-[#0c1222]/50 border border-white/5 space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold flex items-center gap-3">
                <Users className="text-pink-400" /> Speakers & Mentors
              </h3>
              <button 
                onClick={addSpeaker}
                className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <Plus size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <AnimatePresence>
                {speakers.map((speaker, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-6 rounded-3xl bg-black/20 border border-white/5 relative group"
                  >
                    <button 
                      onClick={() => removeSpeaker(index)}
                      className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-red-500/20 border border-red-500/50 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={14} />
                    </button>
                    <div className="grid md:grid-cols-3 gap-6">
                       <input 
                         type="text" 
                         placeholder="Speaker Name"
                         className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-pink-500/50"
                         value={speaker.name}
                         onChange={(e) => updateSpeaker(index, 'name', e.target.value)}
                       />
                       <input 
                         type="text" 
                         placeholder="Designation / Role"
                         className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-pink-500/50"
                         value={speaker.designation}
                         onChange={(e) => updateSpeaker(index, 'designation', e.target.value)}
                       />
                       <div className="flex flex-col gap-2">
                         <input 
                           type="text" 
                           placeholder="Avatar Image URL"
                           className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-pink-500/50"
                           value={speaker.image}
                           onChange={(e) => updateSpeaker(index, 'image', e.target.value)}
                         />
                         <div className="flex items-center gap-2">
                           <label className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:bg-white/10 transition-all">
                             {uploading === `speaker-${index}` ? <Loader2 size={14} className="animate-spin" /> : <><Upload size={14} /> Browse</>}
                             <input 
                               type="file" 
                               className="hidden" 
                               accept="image/*"
                               onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'speaker', index)}
                             />
                           </label>
                           {speaker.image && (
                             <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/10">
                               <img src={speaker.image} className="w-full h-full object-cover" />
                             </div>
                           )}
                         </div>
                       </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {speakers.length === 0 && (
                <p className="text-center py-10 text-slate-600 text-sm italic">No speakers added yet. Click [+] to add.</p>
              )}
            </div>
          </section>

          {/* Schedule Section */}
          <section className="p-8 md:p-10 rounded-[2.5rem] bg-[#0c1222]/50 border border-white/5 space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold flex items-center gap-3">
                <Clock className="text-[#ffd700]" /> Event Schedule
              </h3>
              <button 
                onClick={addSchedule}
                className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <Plus size={20} />
              </button>
            </div>

            <div className="space-y-4">
               <AnimatePresence>
                {schedules.map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="p-6 rounded-3xl bg-black/20 border border-white/5 relative group"
                  >
                    <button 
                      onClick={() => removeSchedule(index)}
                      className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-red-500/20 border border-red-500/50 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={14} />
                    </button>
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-[150px_1fr] gap-6">
                        <input 
                           type="text" 
                           placeholder="Time (e.g. 10:00 AM)"
                           className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#ffd700]/50"
                           value={item.time}
                           onChange={(e) => updateSchedule(index, 'time', e.target.value)}
                        />
                        <input 
                           type="text" 
                           placeholder="Activity Title"
                           className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#ffd700]/50"
                           value={item.title}
                           onChange={(e) => updateSchedule(index, 'title', e.target.value)}
                        />
                      </div>
                      <input 
                         type="text" 
                         placeholder="Short description of the activity (optional)"
                         className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#ffd700]/50"
                         value={item.description}
                         onChange={(e) => updateSchedule(index, 'description', e.target.value)}
                      />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </section>
        </div>

        {/* Sidebar Actions & Secondary Info */}
        <aside className="space-y-8">
           <div className="sticky top-32 space-y-8">
              {/* Publication Control */}
              <section className="p-8 rounded-[2.5rem] bg-[#0c1222] border border-white/10 space-y-6 shadow-2xl">
                 <h3 className="text-lg font-bold">Deployment</h3>
                 <div className="space-y-4">
                    <button 
                      onClick={() => handleSubmit('published')}
                      disabled={loading}
                      className="w-full py-4 rounded-2xl bg-cyan-400 text-[#050510] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all active:scale-95 disabled:opacity-50"
                    >
                      {loading ? <Loader2 size={18} className="animate-spin" /> : <><Send size={18} /> Publish Now</>}
                    </button>
                    <button 
                      onClick={() => handleSubmit('draft')}
                      disabled={loading}
                      className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-white/10 transition-all active:scale-95 disabled:opacity-50"
                    >
                      <Save size={18} /> Save as Draft
                    </button>
                 </div>
                 <p className="text-[10px] text-slate-500 text-center uppercase tracking-widest">Only published events are visible to users</p>
              </section>

              {/* Location & Media */}
              <section className="p-8 rounded-[2.5rem] bg-[#0c1222]/50 border border-white/5 space-y-6">
                 <h3 className="text-lg font-bold flex items-center gap-3"><MapPin size={20} className="text-pink-400" /> Logistics</h3>
                 <div className="space-y-4">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Mode</label>
                       <div className="flex gap-2">
                          {['online', 'offline'].map((mode) => (
                            <button
                              key={mode}
                              onClick={() => setFormData({ ...formData, locationType: mode })}
                              className={`flex-1 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest border transition-all ${formData.locationType === mode ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' : 'bg-white/5 border-white/10 text-slate-500'}`}
                            >
                              {mode}
                            </button>
                          ))}
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{formData.locationType === 'online' ? 'Stream Link' : 'Venue Address'}</label>
                       <input 
                         type="text" 
                         className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs focus:outline-none focus:border-cyan-500/50"
                         placeholder={formData.locationType === 'online' ? 'https://discord.gg/...' : 'Cyber Hub, Floor 4...'}
                         value={formData.location}
                         onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                       />
                    </div>
                 </div>
              </section>

              <section className="p-8 rounded-[2.5rem] bg-[#0c1222]/50 border border-white/5 space-y-6">
                 <h3 className="text-lg font-bold flex items-center gap-3"><ImageIcon size={20} className="text-cyan-400" /> Visuals</h3>
                 <div className="space-y-4">
                     <div className="space-y-4">
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            className="flex-1 bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs focus:outline-none focus:border-cyan-500/50"
                            placeholder="https://..."
                            value={formData.bannerImage}
                            onChange={(e) => setFormData({ ...formData, bannerImage: e.target.value })}
                          />
                          <label className="flex items-center justify-center gap-2 px-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:bg-cyan-500/20 transition-all">
                            {uploading === 'banner' ? <Loader2 size={14} className="animate-spin" /> : <><Upload size={14} /> Browse</>}
                            <input 
                              type="file" 
                              className="hidden" 
                              accept="image/*"
                              onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'banner')}
                            />
                          </label>
                        </div>
                     </div>
                    {formData.bannerImage && (
                      <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                        <img src={formData.bannerImage} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                 </div>
              </section>
           </div>
        </aside>
      </div>
    </div>
  );
}
