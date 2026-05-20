'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { createClient } from '@supabase/supabase-js';
import { Trash2, CheckCircle, XCircle, Plus, LogOut, Eye, EyeOff, Globe, Edit } from 'lucide-react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const getDirectImageUrl = (url: string) => {
  if (!url) return url;
  const driveRegex = /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/;
  const match = url.match(driveRegex);
  if (match && match[1]) {
    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  }
  return url;
};

interface PricingPlan {
  id?: string | number;
  name: string;
  subtitle: string;
  price: string;
  description: string;
  features: string[];
  excluded: string[];
  popular: boolean;
  order_index?: number;
}

interface ComparisonFeature {
  id?: string | number;
  feature: string;
  basic: string;
  standard: string;
  premium: string;
  order_index?: number;
}

interface PricingSettings {
  pricing_header: string;
  pricing_title: string;
  pricing_subtitle: string;
  comparison_title: string;
  comparison_col1: string;
  comparison_col2: string;
  comparison_col3: string;
  comparison_col4: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'testimonials' | 'projects' | 'team' | 'pricing'>('testimonials');
  
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [team, setTeam] = useState<any[]>([]);
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);
  const [comparisonFeatures, setComparisonFeatures] = useState<ComparisonFeature[]>([]);
  const [pricingSettings, setPricingSettings] = useState<PricingSettings | null>(null);
  const [pricingSettingsForm, setPricingSettingsForm] = useState<any>({});
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Project form
  const [newProjectUrl, setNewProjectUrl] = useState('');
  const [scraping, setScraping] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Edit modals state
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<any | null>(null);
  const [editingTeamMember, setEditingTeamMember] = useState<any | null>(null);
  const [editingPricingPlan, setEditingPricingPlan] = useState<any | null>(null);
  const [editingComparisonFeature, setEditingComparisonFeature] = useState<any | null>(null);
  const [projectEditForm, setProjectEditForm] = useState({
    title: '',
    url: '',
    category: '',
    tech: '',
    result: ''
  });
  const [testimonialEditForm, setTestimonialEditForm] = useState({
    name: '',
    role: '',
    business: '',
    content: ''
  });
  const [teamMemberForm, setTeamMemberForm] = useState({
    name: '',
    role: '',
    description: '',
    image_url: ''
  });
  const [pricingPlanForm, setPricingPlanForm] = useState({
    name: '', subtitle: '', price: '', description: '', features: '', excluded: '', popular: false, order_index: 0
  });
  const [comparisonFeatureForm, setComparisonFeatureForm] = useState({
    feature: '', basic: '', standard: '', premium: '', order_index: 0
  });

  const startEditingProject = (p: any) => {
    setEditingProject(p);
    setProjectEditForm({
      title: p.title || '',
      url: p.url || '',
      category: p.category || 'Sistema Web',
      tech: p.tech ? p.tech.join(', ') : '',
      result: p.result || ''
    });
  };

  const startEditingTestimonial = (t: any) => {
    setEditingTestimonial(t);
    setTestimonialEditForm({
      name: t.name || '',
      role: t.role || '',
      business: t.business || '',
      content: t.content || ''
    });
  };

  const startEditingTeamMember = (m: any) => {
    setEditingTeamMember(m);
    setTeamMemberForm({
      name: m.name || '',
      role: m.role || '',
      description: m.description || '',
      image_url: m.image_url || ''
    });
  };

  const startEditingPricingPlan = (p: any) => {
    setEditingPricingPlan(p);
    setPricingPlanForm({
      name: p.name || '',
      subtitle: p.subtitle || '',
      price: p.price || '',
      description: p.description || '',
      features: p.features ? p.features.join('\n') : '',
      excluded: p.excluded ? p.excluded.join('\n') : '',
      popular: p.popular || false,
      order_index: p.order_index || 0
    });
  };

  const startEditingComparisonFeature = (f: any) => {
    setEditingComparisonFeature(f);
    setComparisonFeatureForm({
      feature: f.feature || '',
      basic: f.basic || '',
      standard: f.standard || '',
      premium: f.premium || '',
      order_index: f.order_index || 0
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    let file: File | null = null;
    
    if ('dataTransfer' in e) {
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        file = e.dataTransfer.files[0];
      }
    } else if ('target' in e && (e.target as HTMLInputElement).files && (e.target as HTMLInputElement).files!.length > 0) {
      file = (e.target as HTMLInputElement).files![0];
    }
    
    if (!file) return;
    
    setUploadingImage(true);
    try {
      const adminSupabase = getAdminClient();
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;
      
      const { error: uploadError } = await adminSupabase.storage
        .from('team-images')
        .upload(filePath, file);
        
      if (uploadError) throw uploadError;
      
      const { data } = adminSupabase.storage
        .from('team-images')
        .getPublicUrl(filePath);
        
      if (data && data.publicUrl) {
        setTeamMemberForm(prev => ({ ...prev, image_url: data.publicUrl }));
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error al subir la imagen.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    const savedPassword = localStorage.getItem('admin_password');
    if (savedPassword) {
      setPassword(savedPassword);
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated, activeTab]);

  const getAdminClient = () => {
    return createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          'x-admin-key': password
        }
      }
    });
  };

  const fetchData = async () => {
    setLoading(true);
    const adminSupabase = getAdminClient();
    
    if (activeTab === 'testimonials') {
      const { data, error } = await adminSupabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        if (error.code === '42501') {
          // RLS error means wrong password
          handleLogout();
        }
        console.error(error);
      } else {
        setTestimonials(data || []);
      }
    } else if (activeTab === 'projects') {
      const { data, error } = await adminSupabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        if (error.code === '42501') handleLogout();
        console.error(error);
      } else {
        setProjects(data || []);
      }
    } else if (activeTab === 'team') {
      const { data, error } = await adminSupabase
        .from('team_members')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        if (error.code === '42501') handleLogout();
        console.error(error);
      } else {
        setTeam(data || []);
      }
    } else if (activeTab === 'pricing') {
      const { data: plansData } = await adminSupabase.from('pricing_plans').select('*').order('order_index', { ascending: true });
      const { data: featuresData } = await adminSupabase.from('comparison_features').select('*').order('order_index', { ascending: true });
      const { data: settingsData } = await adminSupabase.from('pricing_settings').select('*').single();
      setPricingPlans(plansData || []);
      setComparisonFeatures(featuresData || []);
      if (settingsData) {
        setPricingSettings(settingsData);
        setPricingSettingsForm(settingsData);
      }
    }
    setLoading(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('admin_password', password);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_password');
    setPassword('');
    setIsAuthenticated(false);
  };

  const toggleTestimonialApproval = async (id: string, currentStatus: boolean) => {
    const adminSupabase = getAdminClient();
    await adminSupabase.from('testimonials').update({ approved: !currentStatus }).eq('id', id);
    fetchData();
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm('¿Seguro que quieres eliminar este comentario?')) return;
    const adminSupabase = getAdminClient();
    await adminSupabase.from('testimonials').delete().eq('id', id);
    fetchData();
  };

  const toggleProjectArchive = async (id: string, currentStatus: boolean) => {
    const adminSupabase = getAdminClient();
    await adminSupabase.from('projects').update({ archived: !currentStatus }).eq('id', id);
    fetchData();
  };

  const deleteProject = async (id: string) => {
    if (!confirm('¿Seguro que quieres eliminar este proyecto?')) return;
    const adminSupabase = getAdminClient();
    await adminSupabase.from('projects').delete().eq('id', id);
    fetchData();
  };

  const deleteTeamMember = async (id: string) => {
    if (!confirm('¿Seguro que quieres eliminar este miembro del equipo?')) return;
    const adminSupabase = getAdminClient();
    await adminSupabase.from('team_members').delete().eq('id', id);
    fetchData();
  };

  const submitEditProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    const adminSupabase = getAdminClient();
    const techArray = projectEditForm.tech.split(',').map(t => t.trim()).filter(t => t);
    
    await adminSupabase.from('projects').update({
      title: projectEditForm.title,
      url: projectEditForm.url,
      category: projectEditForm.category,
      tech: techArray,
      result: projectEditForm.result
    }).eq('id', editingProject.id);
    
    setEditingProject(null);
    fetchData();
  };

  const submitEditTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTestimonial) return;
    const adminSupabase = getAdminClient();
    
    await adminSupabase.from('testimonials').update({
      name: testimonialEditForm.name,
      role: testimonialEditForm.role,
      business: testimonialEditForm.business,
      content: testimonialEditForm.content
    }).eq('id', editingTestimonial.id);
    
    setEditingTestimonial(null);
    fetchData();
  };

  const submitEditTeamMember = async (e: React.FormEvent) => {
    e.preventDefault();
    const adminSupabase = getAdminClient();
    
    if (editingTeamMember && editingTeamMember.id !== 'new') {
      await adminSupabase.from('team_members').update({
        name: teamMemberForm.name,
        role: teamMemberForm.role,
        description: teamMemberForm.description,
        image_url: teamMemberForm.image_url
      }).eq('id', editingTeamMember.id);
    } else {
      await adminSupabase.from('team_members').insert([{
        name: teamMemberForm.name,
        role: teamMemberForm.role,
        description: teamMemberForm.description,
        image_url: teamMemberForm.image_url
      }]);
    }
    
    setEditingTeamMember(null);
    fetchData();
  };

  const deletePricingPlan = async (id: string) => {
    if (!confirm('¿Seguro que quieres eliminar este plan?')) return;
    const adminSupabase = getAdminClient();
    await adminSupabase.from('pricing_plans').delete().eq('id', id);
    fetchData();
  };

  const deleteComparisonFeature = async (id: string) => {
    if (!confirm('¿Seguro que quieres eliminar esta característica?')) return;
    const adminSupabase = getAdminClient();
    await adminSupabase.from('comparison_features').delete().eq('id', id);
    fetchData();
  };

  const submitEditPricingPlan = async (e: React.FormEvent) => {
    e.preventDefault();
    const adminSupabase = getAdminClient();
    const featuresArray = pricingPlanForm.features.split('\n').map(t => t.trim()).filter(t => t);
    const excludedArray = pricingPlanForm.excluded.split('\n').map(t => t.trim()).filter(t => t);
    
    const payload = {
      name: pricingPlanForm.name,
      subtitle: pricingPlanForm.subtitle,
      price: pricingPlanForm.price,
      description: pricingPlanForm.description,
      features: featuresArray,
      excluded: excludedArray,
      popular: pricingPlanForm.popular,
      order_index: Number(pricingPlanForm.order_index)
    };

    if (editingPricingPlan && editingPricingPlan.id !== 'new') {
      await adminSupabase.from('pricing_plans').update(payload).eq('id', editingPricingPlan.id);
    } else {
      await adminSupabase.from('pricing_plans').insert([payload]);
    }
    
    setEditingPricingPlan(null);
    fetchData();
  };

  const submitEditComparisonFeature = async (e: React.FormEvent) => {
    e.preventDefault();
    const adminSupabase = getAdminClient();
    
    const payload = {
      feature: comparisonFeatureForm.feature,
      basic: comparisonFeatureForm.basic,
      standard: comparisonFeatureForm.standard,
      premium: comparisonFeatureForm.premium,
      order_index: Number(comparisonFeatureForm.order_index)
    };

    if (editingComparisonFeature && editingComparisonFeature.id !== 'new') {
      await adminSupabase.from('comparison_features').update(payload).eq('id', editingComparisonFeature.id);
    } else {
      await adminSupabase.from('comparison_features').insert([payload]);
    }
    
    setEditingComparisonFeature(null);
    fetchData();
  };

  const savePricingSettings = async () => {
    setLoading(true);
    const adminSupabase = getAdminClient();
    try {
      const { error } = await adminSupabase.from('pricing_settings').update(pricingSettingsForm).eq('id', 1);
      if (error) throw error;
      fetchData();
      alert('Textos guardados correctamente');
    } catch (e: any) {
      console.error(e);
      alert('Error guardando textos: ' + e.message);
    } finally {
      setLoading(false);
    }
  };


  const scrapeAndAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectUrl) return;
    setScraping(true);
    setErrorMsg('');

    try {
      // Usar un endpoint API local para obtener los metadatos y evitar CORS
      const res = await fetch(`/api/scrape?url=${encodeURIComponent(newProjectUrl)}`);
      if (!res.ok) throw new Error('Error al analizar la URL');
      const meta = await res.json();

      const adminSupabase = getAdminClient();
      const { error } = await adminSupabase.from('projects').insert([{
        title: meta.title || 'Nuevo Proyecto',
        category: 'Sistema Web', // Default
        url: newProjectUrl,
        tech: ['React', 'Next.js'], // Defaults
        result: meta.description ? meta.description.substring(0, 50) + '...' : 'Resultado excelente',
        archived: false
      }]);

      if (error) throw error;

      setNewProjectUrl('');
      fetchData();
    } catch (err: any) {
      setErrorMsg(err.message || 'Error al agregar proyecto');
    } finally {
      setScraping(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 pt-32">
        <div className="card-glass p-10 rounded-4xl w-full max-w-md text-center">
          <h2 className="text-3xl font-black mb-2 text-white">Panel de <span className="text-electric-2">Control</span></h2>
          <p className="text-gray-400 mb-8 font-light">Ingresa la contraseña para continuar</p>
          <form onSubmit={handleLogin} className="space-y-6">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="w-full bg-black/50 border border-electric-2/20 rounded-xl px-4 py-4 text-white focus:border-electric-2 focus:ring-1 outline-none text-center tracking-widest"
              required
            />
            <button type="submit" className="w-full btn-primary py-4 tracking-widest">
              INGRESAR
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 container mx-auto max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <h1 className="text-4xl font-black text-white">Panel de <span className="text-electric-2">Administración</span></h1>
        <button onClick={handleLogout} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <LogOut size={18} /> Salir
        </button>
      </div>

      <div className="flex gap-4 mb-8 border-b border-white/10 pb-4 overflow-x-auto">
        <button
          onClick={() => setActiveTab('testimonials')}
          className={`text-lg font-bold tracking-tight transition-colors whitespace-nowrap ${activeTab === 'testimonials' ? 'text-white border-b-2 border-electric-2 pb-1' : 'text-gray-500 hover:text-gray-300'}`}
        >
          Comentarios / Testimonios
        </button>
        <button
          onClick={() => setActiveTab('projects')}
          className={`text-lg font-bold tracking-tight transition-colors whitespace-nowrap ${activeTab === 'projects' ? 'text-white border-b-2 border-electric-2 pb-1' : 'text-gray-500 hover:text-gray-300'}`}
        >
          Proyectos (Portafolio)
        </button>
        <button
          onClick={() => setActiveTab('team')}
          className={`text-lg font-bold tracking-tight transition-colors whitespace-nowrap ${activeTab === 'team' ? 'text-white border-b-2 border-electric-2 pb-1' : 'text-gray-500 hover:text-gray-300'}`}
        >
          Equipo
        </button>
        <button
          onClick={() => setActiveTab('pricing')}
          className={`text-lg font-bold tracking-tight transition-colors whitespace-nowrap ${activeTab === 'pricing' ? 'text-white border-b-2 border-electric-2 pb-1' : 'text-gray-500 hover:text-gray-300'}`}
        >
          Planes y Precios
        </button>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center"><div className="w-10 h-10 border-4 border-electric-2 border-t-transparent rounded-full animate-spin"></div></div>
      ) : activeTab === 'testimonials' ? (
        <div className="space-y-6">
          {testimonials.length === 0 ? (
            <p className="text-gray-400 text-center py-10">No hay testimonios aún.</p>
          ) : (
            testimonials.map(t => (
              <div key={t.id} className={`card-glass p-6 rounded-2xl border ${t.approved ? 'border-green-500/30' : 'border-yellow-500/30'} flex flex-col md:flex-row gap-6 items-start md:items-center justify-between`}>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-white">{t.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full font-bold ${t.approved ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                      {t.approved ? 'PÚBLICO' : 'PENDIENTE'}
                    </span>
                  </div>
                  <p className="text-sm text-electric-2 mb-3">{t.role} en {t.business}</p>
                  <p className="text-gray-300 italic">"{t.content}"</p>
                </div>
                <div className="flex gap-3 w-full md:w-auto flex-wrap justify-end mt-4 md:mt-0">
                  <button onClick={() => toggleTestimonialApproval(t.id, t.approved)} className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-semibold transition-colors ${t.approved ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'}`}>
                    {t.approved ? <><XCircle size={18} /> Ocultar</> : <><CheckCircle size={18} /> Aprobar</>}
                  </button>
                  <button onClick={() => startEditingTestimonial(t)} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-semibold bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors">
                    <Edit size={18} /> Editar
                  </button>
                  <button onClick={() => deleteTestimonial(t.id)} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-semibold bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors">
                    <Trash2 size={18} /> Eliminar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      ) : activeTab === 'projects' ? (
        <div className="space-y-10">
          <div className="card-glass p-8 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-6">Agregar Nuevo Proyecto</h3>
            <form onSubmit={scrapeAndAddProject} className="flex flex-col md:flex-row gap-4">
              <input
                type="url"
                required
                placeholder="https://ejemplo.com"
                value={newProjectUrl}
                onChange={(e) => setNewProjectUrl(e.target.value)}
                className="flex-1 bg-black/50 border border-electric-2/20 rounded-xl px-4 py-3 text-white focus:border-electric-2 outline-none"
              />
              <button type="submit" disabled={scraping} className="btn-primary py-3 px-8 flex items-center justify-center gap-2 disabled:opacity-50">
                {scraping ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <Globe size={18} />}
                {scraping ? 'OBTENIENDO...' : 'AGREGAR CON LINK'}
              </button>
            </form>
            {errorMsg && <p className="text-red-400 text-sm mt-4">{errorMsg}</p>}
            <p className="text-gray-500 text-xs mt-4">Nota: Obtendrá información básica automáticamente. Podrás editarla desde Supabase si necesitas ajustar algo más específico.</p>
          </div>

          <div className="space-y-4">
            {projects.length === 0 ? (
              <p className="text-gray-400 text-center py-10">No hay proyectos en el portafolio.</p>
            ) : (
              projects.map(p => (
                <div key={p.id} className={`card-glass p-6 rounded-2xl border ${p.archived ? 'border-gray-700 opacity-50' : 'border-electric-2/30'} flex flex-col md:flex-row gap-6 items-start md:items-center justify-between transition-all`}>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">{p.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full font-bold ${p.archived ? 'bg-gray-800 text-gray-400' : 'bg-electric-2/20 text-electric-2'}`}>
                        {p.archived ? 'OCULTO' : 'PÚBLICO'}
                      </span>
                    </div>
                    <a href={p.url} target="_blank" rel="noreferrer" className="text-sm text-gray-400 hover:text-white mb-2 inline-block">{p.url}</a>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-xs bg-white/10 px-2 py-1 rounded text-white">{p.category}</span>
                      {p.tech?.map((t: string) => <span key={t} className="text-xs border border-white/20 px-2 py-1 rounded text-gray-300">{t}</span>)}
                    </div>
                  </div>
                  <div className="flex gap-3 w-full md:w-auto flex-wrap justify-end mt-4 md:mt-0">
                    <button onClick={() => toggleProjectArchive(p.id, p.archived)} className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-semibold transition-colors ${p.archived ? 'bg-electric-2/20 text-electric-2 hover:bg-electric-2/30' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}>
                      {p.archived ? <><Eye size={18} /> Mostrar</> : <><EyeOff size={18} /> Ocultar</>}
                    </button>
                    <button onClick={() => startEditingProject(p)} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-semibold bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors">
                      <Edit size={18} /> Editar
                    </button>
                    <button onClick={() => deleteProject(p.id)} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-semibold bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors">
                      <Trash2 size={18} /> Eliminar
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ) : activeTab === 'team' ? (
        <div className="space-y-10">
          <div className="card-glass p-8 rounded-2xl flex justify-between items-center">
            <h3 className="text-xl font-bold text-white">Miembros del Equipo</h3>
            <button onClick={() => startEditingTeamMember({ id: 'new' })} className="btn-primary py-2 px-6 flex items-center gap-2">
              <Plus size={18} /> Agregar
            </button>
          </div>

          <div className="space-y-4">
            {team.length === 0 ? (
              <p className="text-gray-400 text-center py-10">No hay miembros del equipo.</p>
            ) : (
              team.map(m => (
                <div key={m.id} className="card-glass p-6 rounded-2xl border border-electric-2/30 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between transition-all">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {m.image_url ? (
                        <img src={getDirectImageUrl(m.image_url)} alt={m.name} className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-electric-2/20 flex items-center justify-center text-electric-2 font-bold">{m.name.charAt(0)}</div>
                      )}
                      <h3 className="text-xl font-bold text-white">{m.name}</h3>
                    </div>
                    <p className="text-sm text-electric-2 mb-2">{m.role}</p>
                    <p className="text-sm text-gray-400">{m.description?.substring(0, 100)}...</p>
                  </div>
                  <div className="flex gap-3 w-full md:w-auto flex-wrap justify-end mt-4 md:mt-0">
                    <button onClick={() => startEditingTeamMember(m)} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-semibold bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors">
                      <Edit size={18} /> Editar
                    </button>
                    <button onClick={() => deleteTeamMember(m.id)} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-semibold bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors">
                      <Trash2 size={18} /> Eliminar
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-10">
          {/* Settings for Texts */}
          <div className="card-glass p-8 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-6">Textos de la Sección de Planes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase">Encabezado Pequeño</label>
                <input type="text" value={pricingSettingsForm.pricing_header || ''} onChange={e => setPricingSettingsForm({...pricingSettingsForm, pricing_header: e.target.value})} className="w-full bg-black/50 border border-electric-2/20 rounded-xl px-4 py-3 text-white focus:border-electric-2 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase">Título Principal</label>
                <input type="text" value={pricingSettingsForm.pricing_title || ''} onChange={e => setPricingSettingsForm({...pricingSettingsForm, pricing_title: e.target.value})} className="w-full bg-black/50 border border-electric-2/20 rounded-xl px-4 py-3 text-white focus:border-electric-2 outline-none" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase">Subtítulo</label>
                <input type="text" value={pricingSettingsForm.pricing_subtitle || ''} onChange={e => setPricingSettingsForm({...pricingSettingsForm, pricing_subtitle: e.target.value})} className="w-full bg-black/50 border border-electric-2/20 rounded-xl px-4 py-3 text-white focus:border-electric-2 outline-none" />
              </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-6 mt-10">Textos de la Tabla de Características</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
              <div className="lg:col-span-2">
                <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase">Título de la Tabla</label>
                <input type="text" value={pricingSettingsForm.comparison_title || ''} onChange={e => setPricingSettingsForm({...pricingSettingsForm, comparison_title: e.target.value})} className="w-full bg-black/50 border border-electric-2/20 rounded-xl px-4 py-3 text-white focus:border-electric-2 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase">Columna 1 (Plan 1)</label>
                <input type="text" value={pricingSettingsForm.comparison_col2 || ''} onChange={e => setPricingSettingsForm({...pricingSettingsForm, comparison_col2: e.target.value})} className="w-full bg-black/50 border border-electric-2/20 rounded-xl px-4 py-3 text-white focus:border-electric-2 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase">Columna 2 (Plan 2)</label>
                <input type="text" value={pricingSettingsForm.comparison_col3 || ''} onChange={e => setPricingSettingsForm({...pricingSettingsForm, comparison_col3: e.target.value})} className="w-full bg-black/50 border border-electric-2/20 rounded-xl px-4 py-3 text-white focus:border-electric-2 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase">Columna 3 (Plan 3)</label>
                <input type="text" value={pricingSettingsForm.comparison_col4 || ''} onChange={e => setPricingSettingsForm({...pricingSettingsForm, comparison_col4: e.target.value})} className="w-full bg-black/50 border border-electric-2/20 rounded-xl px-4 py-3 text-white focus:border-electric-2 outline-none" />
              </div>
            </div>

            <button onClick={savePricingSettings} className="btn-primary py-2 px-6">
              Guardar Textos
            </button>
          </div>

          <div className="card-glass p-8 rounded-2xl flex justify-between items-center">
            <h3 className="text-xl font-bold text-white">Planes de Precios</h3>
            <button onClick={() => startEditingPricingPlan({ id: 'new' })} className="btn-primary py-2 px-6 flex items-center gap-2">
              <Plus size={18} /> Agregar Plan
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map(p => (
              <div key={p.id} className={`card-glass p-6 rounded-2xl border ${p.popular ? 'border-electric-2' : 'border-white/10'} flex flex-col`}>
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-xl font-bold text-white">{p.name}</h4>
                  {p.popular && <span className="text-xs bg-electric-2/20 text-electric-2 px-2 py-1 rounded font-bold tracking-wider">POPULAR</span>}
                </div>
                <p className="text-2xl font-black text-white mb-2">{p.price}</p>
                <p className="text-sm text-gray-400 mb-4 flex-1">{p.subtitle}</p>
                <div className="flex gap-2 mt-4">
                  <button onClick={() => startEditingPricingPlan(p)} className="flex-1 py-2 rounded-lg font-semibold bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors flex items-center justify-center gap-2 text-sm">
                    <Edit size={16} /> Editar
                  </button>
                  <button onClick={() => deletePricingPlan(p.id)} className="flex-1 py-2 rounded-lg font-semibold bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors flex items-center justify-center gap-2 text-sm">
                    <Trash2 size={16} /> Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="card-glass p-8 rounded-2xl flex justify-between items-center mt-12">
            <h3 className="text-xl font-bold text-white">Detalles de Características</h3>
            <button onClick={() => startEditingComparisonFeature({ id: 'new' })} className="btn-primary py-2 px-6 flex items-center gap-2">
              <Plus size={18} /> Agregar Característica
            </button>
          </div>
          <div className="card-glass rounded-2xl overflow-hidden overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-white/5 text-gray-400 uppercase">
                <tr>
                  <th className="px-6 py-4 font-semibold">Característica</th>
                  <th className="px-6 py-4 font-semibold">Básico</th>
                  <th className="px-6 py-4 font-semibold">Estándar</th>
                  <th className="px-6 py-4 font-semibold">Premium</th>
                  <th className="px-6 py-4 font-semibold text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {comparisonFeatures.map(f => (
                  <tr key={f.id} className="hover:bg-white/5">
                    <td className="px-6 py-4 font-medium text-white">{f.feature}</td>
                    <td className="px-6 py-4 text-gray-400">{f.basic}</td>
                    <td className="px-6 py-4 text-gray-400">{f.standard}</td>
                    <td className="px-6 py-4 text-gray-400">{f.premium}</td>
                    <td className="px-6 py-4 flex justify-end gap-2">
                      <button onClick={() => startEditingComparisonFeature(f)} className="p-2 rounded bg-blue-500/20 text-blue-400 hover:bg-blue-500/30">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => deleteComparisonFeature(f.id)} className="p-2 rounded bg-red-500/20 text-red-400 hover:bg-red-500/30">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Testimonial Modal */}
      {editingTestimonial && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card-glass p-8 rounded-2xl w-full max-w-lg border border-electric-2/30">
            <h3 className="text-2xl font-bold text-white mb-6">Editar Testimonio</h3>
            <form onSubmit={submitEditTestimonial} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Nombre</label>
                <input type="text" value={testimonialEditForm.name} onChange={e => setTestimonialEditForm({...testimonialEditForm, name: e.target.value})} className="w-full bg-black/50 border border-electric-2/20 rounded-xl px-4 py-3 text-white focus:border-electric-2 outline-none" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Cargo</label>
                  <input type="text" value={testimonialEditForm.role} onChange={e => setTestimonialEditForm({...testimonialEditForm, role: e.target.value})} className="w-full bg-black/50 border border-electric-2/20 rounded-xl px-4 py-3 text-white focus:border-electric-2 outline-none" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Empresa</label>
                  <input type="text" value={testimonialEditForm.business} onChange={e => setTestimonialEditForm({...testimonialEditForm, business: e.target.value})} className="w-full bg-black/50 border border-electric-2/20 rounded-xl px-4 py-3 text-white focus:border-electric-2 outline-none" required />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Contenido</label>
                <textarea value={testimonialEditForm.content} onChange={e => setTestimonialEditForm({...testimonialEditForm, content: e.target.value})} className="w-full bg-black/50 border border-electric-2/20 rounded-xl px-4 py-3 text-white focus:border-electric-2 outline-none" rows={4} required></textarea>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setEditingTestimonial(null)} className="flex-1 py-3 rounded-xl font-bold border border-white/20 text-gray-300 hover:bg-white/10 transition-colors">Cancelar</button>
                <button type="submit" className="flex-1 btn-primary py-3">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Project Modal */}
      {editingProject && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card-glass p-8 rounded-2xl w-full max-w-lg border border-electric-2/30">
            <h3 className="text-2xl font-bold text-white mb-6">Editar Proyecto</h3>
            <form onSubmit={submitEditProject} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Título</label>
                <input type="text" value={projectEditForm.title} onChange={e => setProjectEditForm({...projectEditForm, title: e.target.value})} className="w-full bg-black/50 border border-electric-2/20 rounded-xl px-4 py-3 text-white focus:border-electric-2 outline-none" required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">URL</label>
                <input type="url" value={projectEditForm.url} onChange={e => setProjectEditForm({...projectEditForm, url: e.target.value})} className="w-full bg-black/50 border border-electric-2/20 rounded-xl px-4 py-3 text-white focus:border-electric-2 outline-none" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Categoría</label>
                  <input type="text" value={projectEditForm.category} onChange={e => setProjectEditForm({...projectEditForm, category: e.target.value})} className="w-full bg-black/50 border border-electric-2/20 rounded-xl px-4 py-3 text-white focus:border-electric-2 outline-none" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Tecnologías (separadas por comas)</label>
                  <input type="text" value={projectEditForm.tech} onChange={e => setProjectEditForm({...projectEditForm, tech: e.target.value})} className="w-full bg-black/50 border border-electric-2/20 rounded-xl px-4 py-3 text-white focus:border-electric-2 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Resultado / Descripción</label>
                <textarea value={projectEditForm.result} onChange={e => setProjectEditForm({...projectEditForm, result: e.target.value})} className="w-full bg-black/50 border border-electric-2/20 rounded-xl px-4 py-3 text-white focus:border-electric-2 outline-none" rows={3}></textarea>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setEditingProject(null)} className="flex-1 py-3 rounded-xl font-bold border border-white/20 text-gray-300 hover:bg-white/10 transition-colors">Cancelar</button>
                <button type="submit" className="flex-1 btn-primary py-3">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Team Member Modal */}
      {editingTeamMember && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card-glass p-8 rounded-2xl w-full max-w-lg border border-electric-2/30 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-white mb-6">{editingTeamMember.id === 'new' ? 'Agregar' : 'Editar'} Miembro del Equipo</h3>
            <form onSubmit={submitEditTeamMember} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Nombre</label>
                <input type="text" value={teamMemberForm.name} onChange={e => setTeamMemberForm({...teamMemberForm, name: e.target.value})} className="w-full bg-black/50 border border-electric-2/20 rounded-xl px-4 py-3 text-white focus:border-electric-2 outline-none" required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Cargo</label>
                <input type="text" value={teamMemberForm.role} onChange={e => setTeamMemberForm({...teamMemberForm, role: e.target.value})} className="w-full bg-black/50 border border-electric-2/20 rounded-xl px-4 py-3 text-white focus:border-electric-2 outline-none" required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Descripción</label>
                <textarea value={teamMemberForm.description} onChange={e => setTeamMemberForm({...teamMemberForm, description: e.target.value})} className="w-full bg-black/50 border border-electric-2/20 rounded-xl px-4 py-3 text-white focus:border-electric-2 outline-none" rows={4} required></textarea>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Imagen (Subir o URL)</label>
                <div 
                  className="w-full border-2 border-dashed border-electric-2/30 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/5 transition-colors relative mb-3"
                  onDrop={handleImageUpload}
                  onDragOver={handleDragOver}
                >
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={uploadingImage}
                  />
                  {uploadingImage ? (
                    <div className="w-6 h-6 border-2 border-electric-2 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <div className="bg-electric-2/20 p-3 rounded-full mb-2">
                        <Plus size={20} className="text-electric-2" />
                      </div>
                      <p className="text-sm text-gray-300 font-medium">Arrastra una imagen o haz clic</p>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP</p>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-white/10"></div>
                  <span className="text-xs text-gray-500 uppercase tracking-widest">o usa un enlace</span>
                  <div className="flex-1 h-px bg-white/10"></div>
                </div>
                <input type="url" value={teamMemberForm.image_url} onChange={e => setTeamMemberForm({...teamMemberForm, image_url: e.target.value})} placeholder="https://..." className="w-full bg-black/50 border border-electric-2/20 rounded-xl px-4 py-3 text-white focus:border-electric-2 outline-none mt-3" />
                {teamMemberForm.image_url && (
                  <div className="mt-3">
                    <p className="text-xs text-gray-400 mb-1">Vista previa:</p>
                    <img src={getDirectImageUrl(teamMemberForm.image_url)} alt="Vista previa" className="w-16 h-16 object-cover rounded-xl border border-white/20" />
                  </div>
                )}
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setEditingTeamMember(null)} className="flex-1 py-3 rounded-xl font-bold border border-white/20 text-gray-300 hover:bg-white/10 transition-colors">Cancelar</button>
                <button type="submit" className="flex-1 btn-primary py-3">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Pricing Plan Modal */}
      {editingPricingPlan && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card-glass p-8 rounded-2xl w-full max-w-2xl border border-electric-2/30 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-white mb-6">{editingPricingPlan.id === 'new' ? 'Agregar' : 'Editar'} Plan</h3>
            <form onSubmit={submitEditPricingPlan} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Nombre del Plan</label>
                  <input type="text" value={pricingPlanForm.name} onChange={e => setPricingPlanForm({...pricingPlanForm, name: e.target.value})} className="w-full bg-black/50 border border-electric-2/20 rounded-xl px-4 py-3 text-white focus:border-electric-2 outline-none" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Precio</label>
                  <input type="text" value={pricingPlanForm.price} onChange={e => setPricingPlanForm({...pricingPlanForm, price: e.target.value})} className="w-full bg-black/50 border border-electric-2/20 rounded-xl px-4 py-3 text-white focus:border-electric-2 outline-none" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Subtítulo</label>
                  <input type="text" value={pricingPlanForm.subtitle} onChange={e => setPricingPlanForm({...pricingPlanForm, subtitle: e.target.value})} className="w-full bg-black/50 border border-electric-2/20 rounded-xl px-4 py-3 text-white focus:border-electric-2 outline-none" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Orden (Número)</label>
                  <input type="number" value={pricingPlanForm.order_index} onChange={e => setPricingPlanForm({...pricingPlanForm, order_index: parseInt(e.target.value) || 0})} className="w-full bg-black/50 border border-electric-2/20 rounded-xl px-4 py-3 text-white focus:border-electric-2 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Descripción</label>
                <textarea value={pricingPlanForm.description} onChange={e => setPricingPlanForm({...pricingPlanForm, description: e.target.value})} className="w-full bg-black/50 border border-electric-2/20 rounded-xl px-4 py-3 text-white focus:border-electric-2 outline-none" rows={2}></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Incluye (Una por línea)</label>
                  <textarea value={pricingPlanForm.features} onChange={e => setPricingPlanForm({...pricingPlanForm, features: e.target.value})} className="w-full bg-black/50 border border-electric-2/20 rounded-xl px-4 py-3 text-white focus:border-electric-2 outline-none" rows={5}></textarea>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">No Incluye (Una por línea)</label>
                  <textarea value={pricingPlanForm.excluded} onChange={e => setPricingPlanForm({...pricingPlanForm, excluded: e.target.value})} className="w-full bg-black/50 border border-electric-2/20 rounded-xl px-4 py-3 text-white focus:border-electric-2 outline-none" rows={5}></textarea>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <input type="checkbox" id="popularCheckbox" checked={pricingPlanForm.popular} onChange={e => setPricingPlanForm({...pricingPlanForm, popular: e.target.checked})} className="w-5 h-5 accent-electric-2 rounded border-gray-600 bg-gray-700" />
                <label htmlFor="popularCheckbox" className="text-sm font-semibold text-white cursor-pointer">Marcar como plan MÁS POPULAR</label>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setEditingPricingPlan(null)} className="flex-1 py-3 rounded-xl font-bold border border-white/20 text-gray-300 hover:bg-white/10 transition-colors">Cancelar</button>
                <button type="submit" className="flex-1 btn-primary py-3">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Comparison Feature Modal */}
      {editingComparisonFeature && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card-glass p-8 rounded-2xl w-full max-w-lg border border-electric-2/30 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-white mb-6">{editingComparisonFeature.id === 'new' ? 'Agregar' : 'Editar'} Característica</h3>
            <form onSubmit={submitEditComparisonFeature} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Característica</label>
                <input type="text" value={comparisonFeatureForm.feature} onChange={e => setComparisonFeatureForm({...comparisonFeatureForm, feature: e.target.value})} className="w-full bg-black/50 border border-electric-2/20 rounded-xl px-4 py-3 text-white focus:border-electric-2 outline-none" required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Valor Básico</label>
                <input type="text" value={comparisonFeatureForm.basic} onChange={e => setComparisonFeatureForm({...comparisonFeatureForm, basic: e.target.value})} className="w-full bg-black/50 border border-electric-2/20 rounded-xl px-4 py-3 text-white focus:border-electric-2 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Valor Estándar</label>
                <input type="text" value={comparisonFeatureForm.standard} onChange={e => setComparisonFeatureForm({...comparisonFeatureForm, standard: e.target.value})} className="w-full bg-black/50 border border-electric-2/20 rounded-xl px-4 py-3 text-white focus:border-electric-2 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Valor Premium</label>
                <input type="text" value={comparisonFeatureForm.premium} onChange={e => setComparisonFeatureForm({...comparisonFeatureForm, premium: e.target.value})} className="w-full bg-black/50 border border-electric-2/20 rounded-xl px-4 py-3 text-white focus:border-electric-2 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Orden (Número)</label>
                <input type="number" value={comparisonFeatureForm.order_index} onChange={e => setComparisonFeatureForm({...comparisonFeatureForm, order_index: parseInt(e.target.value) || 0})} className="w-full bg-black/50 border border-electric-2/20 rounded-xl px-4 py-3 text-white focus:border-electric-2 outline-none" />
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setEditingComparisonFeature(null)} className="flex-1 py-3 rounded-xl font-bold border border-white/20 text-gray-300 hover:bg-white/10 transition-colors">Cancelar</button>
                <button type="submit" className="flex-1 btn-primary py-3">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
