import React, { useEffect, useState } from 'react';
import { useProduct } from '../hooks/useProducts';
import { useParams, useNavigate } from 'react-router';
import { Plus, Trash2, Image as ImageIcon, ArrowLeft, Save, Package, DollarSign, AlertCircle, RefreshCcw, Tag } from 'lucide-react';

const SellerProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [localVariants, setLocalVariants] = useState([]);
  const [isAddingVariant, setIsAddingVariant] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSavingVariant, setIsSavingVariant] = useState(false);

  // UI state for inputs to maintain focus
  const [attributeInputs, setAttributeInputs] = useState([{ key: '', value: '' }]);

  // New variant state
  const [newVariant, setNewVariant] = useState({
    images: [],
    stock: 0,
    attributes: {},
    price: { amount: '', currency: 'INR' }
  });

  const { productId } = useParams();
  const navigate = useNavigate();
  const { handleGetProductById, handleAddProductVariant } = useProduct();

  async function fetchProductDetails() {
    setLoading(true);
    setError(null);
    try {
      const data = await handleGetProductById(productId);
      const prod = data?.product || data;
      setProduct(prod);
      if (prod?.variants) {
        setLocalVariants(prod.variants);
      }
    } catch (error) {
      console.error("Failed to fetch product details", error);
      setError("Failed to fetch product details.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  const handleStockChange = (index, newStock) => {
    const updatedVariants = [...localVariants];
    updatedVariants[index] = { ...updatedVariants[index], stock: Number(newStock) };
    setLocalVariants(updatedVariants);
  };

  const handleAddNewVariant = async () => {
    const hasValidAttribute = attributeInputs.some(attr => attr.key.trim() && attr.value.trim());
    if (!hasValidAttribute) {
      alert("At least one valid attribute is required.");
      return;
    }

    setIsSavingVariant(true);

    try {
      const cleanImages = newVariant.images.map(img => ({ url: img.previewUrl, file: img.file }));
      const cleanAttributes = { ...newVariant.attributes };

      const variantToSave = {
        images: cleanImages,
        stock: Number(newVariant.stock),
        attributes: cleanAttributes,
        price: newVariant.price.amount ? Number(newVariant.price.amount) : undefined
      };

      const data = await handleAddProductVariant(productId, variantToSave);
      
      const addedVariant = data?.variant || data; // Depending on API response

      if (addedVariant && addedVariant._id) {
        setLocalVariants([...localVariants, addedVariant]);
      } else {
        // Fallback for immediate UI update if api doesn't return the exact variant structure cleanly
        setLocalVariants([...localVariants, variantToSave]); 
        // Re-fetch to ensure sync with server
        fetchProductDetails();
      }

      setIsAddingVariant(false);
      setAttributeInputs([{ key: '', value: '' }]);
      setNewVariant({
        images: [],
        stock: 0,
        attributes: {},
        price: { amount: '', currency: 'INR' }
      });
    } catch(err) {
      console.error("Failed to add variant", err);
      alert("Failed to add variant. Please try again.");
    } finally {
      setIsSavingVariant(false);
    }
  };

  const handleAddAttribute = () => {
    setAttributeInputs(prev => [...prev, { key: '', value: '' }]);
  };

  const handleAttributeChange = (index, field, value) => {
    const updatedInputs = [...attributeInputs];
    updatedInputs[index][field] = value;
    setAttributeInputs(updatedInputs);

    const newAttrsObj = {};
    updatedInputs.forEach(attr => {
      if (attr.key.trim() !== '') {
        newAttrsObj[attr.key.trim()] = attr.value;
      }
    });
    setNewVariant(prev => ({ ...prev, attributes: newAttrsObj }));
  };

  const handleRemoveAttribute = (index) => {
    const updatedInputs = attributeInputs.filter((_, i) => i !== index);
    setAttributeInputs(updatedInputs);

    const newAttrsObj = {};
    updatedInputs.forEach(attr => {
      if (attr.key.trim() !== '') {
        newAttrsObj[attr.key.trim()] = attr.value;
      }
    });
    setNewVariant(prev => ({ ...prev, attributes: newAttrsObj }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const availableSlots = 7 - newVariant.images.length;
    const filesToAdd = files.slice(0, availableSlots);

    if (files.length > availableSlots) {
      alert(`You can only upload up to 7 images. ${filesToAdd.length} added.`);
    }

    const newImageObjects = filesToAdd.map(file => ({
      file,
      previewUrl: URL.createObjectURL(file)
    }));

    setNewVariant(prev => ({
      ...prev,
      images: [...prev.images, ...newImageObjects]
    }));

    e.target.value = '';
  };

  const handleRemoveImage = (index) => {
    const imageToRemove = newVariant.images[index];
    if (imageToRemove?.previewUrl) {
      URL.revokeObjectURL(imageToRemove.previewUrl);
    }
    const updatedImages = newVariant.images.filter((_, i) => i !== index);
    setNewVariant(prev => ({ ...prev, images: updatedImages }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center font-sans">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
        <p className="text-gray-500 font-medium tracking-wide animate-pulse">Loading product details...</p>
      </div>
    );
  }

  if (error) {
     return (
       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
         <div className="bg-white rounded-2xl shadow-xl shadow-red-500/10 border border-red-100 p-12 flex flex-col items-center justify-center text-center max-w-md w-full">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
              <AlertCircle className="text-red-500 w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Oops! Something went wrong</h3>
            <p className="text-gray-500 mb-8 leading-relaxed">{error}</p>
            <div className="flex gap-4 w-full justify-center">
              <button onClick={() => navigate('/seller/dashboard')} className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-semibold">Go Back</button>
              <button onClick={fetchProductDetails} className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-semibold flex items-center gap-2 shadow-md hover:shadow-lg hover:-translate-y-0.5">
                <RefreshCcw size={18} /> Retry
              </button>
            </div>
          </div>
       </div>
     );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-800 font-sans">
        <div className="bg-white p-12 rounded-2xl shadow-sm text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-500 mb-6">The product you are looking for does not exist or has been removed.</p>
          <button onClick={() => navigate('/seller/dashboard')} className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-semibold shadow-md">Return to Dashboard</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2.5 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-900">
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-2xl font-black text-gray-900 leading-tight tracking-tight">Product Details</h1>
              <p className="text-sm text-gray-500 truncate max-w-[200px] sm:max-w-md font-medium">{product.title}</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-3">
             <span className="bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-emerald-100 flex items-center gap-1.5">
               <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div> Active
             </span>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-10">
        
        {/* Product Overview Card */}
        <section className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-shadow duration-300">
          <div className="w-full md:w-5/12 bg-gray-50/50 p-6 sm:p-8 flex flex-col justify-center border-r border-gray-100">
            <div className="aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden relative shadow-sm border border-gray-200 group">
              {product.images && product.images.length > 0 ? (
                <img src={product.images[0].url} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50">
                  <ImageIcon size={48} className="opacity-40 mb-3" />
                  <span className="text-sm font-semibold tracking-wide uppercase">No Image</span>
                </div>
              )}
            </div>
             {product.images && product.images.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-hide snap-x">
                {product.images.slice(1).map((img, i) => (
                  <img key={i} src={img.url} alt={`Thumb ${i}`} className="w-16 h-20 rounded-xl object-cover bg-gray-200 shrink-0 snap-start border border-gray-200 hover:border-indigo-400 transition-colors cursor-pointer" />
                ))}
              </div>
            )}
          </div>
          
          <div className="w-full md:w-7/12 p-8 sm:p-10 flex flex-col">
            <div className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-xs font-mono uppercase tracking-widest font-semibold mb-6 w-fit">
              <Tag size={12} /> ID: {product._id.slice(-8)}
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4 leading-tight tracking-tight">{product.title}</h2>
            <p className="text-gray-600 text-base sm:text-lg mb-10 leading-relaxed font-light">{product.description}</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 pt-8 border-t border-gray-100 mt-auto">
              <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-50">
                <p className="text-xs text-indigo-500 uppercase tracking-widest font-bold mb-1.5 flex items-center gap-1.5"><DollarSign size={14}/> Base Price</p>
                <p className="text-3xl font-black text-indigo-900">{product.price?.currency === 'INR' ? '₹' : product.price?.currency}{product.price?.amount?.toLocaleString()}</p>
              </div>
              <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-50">
                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1.5">Category</p>
                <p className="text-xl font-bold text-gray-800 capitalize">{product.category || 'N/A'}</p>
              </div>
              <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-50">
                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1.5">Total Variants</p>
                <p className="text-xl font-bold text-gray-800">{localVariants.length}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Variants & Inventory */}
        <section className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
            <div>
              <h3 className="text-2xl font-black text-gray-900 flex items-center gap-3 tracking-tight">
                <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                  <Package size={24} />
                </div>
                Variants & Inventory
              </h3>
              <p className="text-gray-500 mt-2 font-medium">Manage stock and create new variations of this product.</p>
            </div>
            {!isAddingVariant && (
              <button
                onClick={() => setIsAddingVariant(true)}
                className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                <Plus size={20} /> Add New Variant
              </button>
            )}
          </div>

          {/* Add New Variant Form */}
          {isAddingVariant && (
            <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-200 mb-10">
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
                <h4 className="text-xl font-black text-gray-900">Create New Variant</h4>
                <button
                  onClick={() => setIsAddingVariant(false)}
                  className="text-gray-500 hover:text-gray-900 text-sm font-bold uppercase tracking-wider transition-colors px-4 py-2 hover:bg-gray-200 rounded-lg"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Form Left Col: Attributes & Basics */}
                <div className="space-y-8">
                  {/* Dynamic Attributes */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Attributes (e.g. Size, Color) *</label>
                    <div className="space-y-4">
                      {attributeInputs.map((attr, index) => (
                        <div key={index} className="flex gap-3 items-center group">
                          <input
                            type="text"
                            placeholder="Key (e.g., Size)"
                            value={attr.key}
                            onChange={(e) => handleAttributeChange(index, 'key', e.target.value)}
                            className="w-1/2 bg-white border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all shadow-sm text-gray-900 font-medium"
                          />
                          <input
                            type="text"
                            placeholder="Value (e.g., M)"
                            value={attr.value}
                            onChange={(e) => handleAttributeChange(index, 'value', e.target.value)}
                            className="w-1/2 bg-white border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all shadow-sm text-gray-900 font-medium"
                          />
                          {attributeInputs.length > 1 && (
                            <button onClick={() => handleRemoveAttribute(index)} className="text-gray-400 p-3 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                              <Trash2 size={20} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={handleAddAttribute}
                      className="mt-5 text-indigo-600 text-sm font-bold flex items-center gap-2 hover:text-indigo-800 transition-colors px-4 py-2 bg-indigo-50 rounded-lg hover:bg-indigo-100"
                    >
                      <Plus size={16} /> Add Another Attribute
                    </button>
                  </div>

                  <hr className="border-gray-200" />

                  {/* Stock & Price */}
                  <div className="flex gap-6">
                    <div className="w-1/2">
                      <label className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Initial Stock</label>
                      <input
                        type="number"
                        min="0"
                        value={newVariant.stock}
                        onChange={(e) => setNewVariant({ ...newVariant, stock: e.target.value })}
                        className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all shadow-sm font-bold text-lg text-gray-900"
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Price Amount (Optional)</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <DollarSign size={18} className="text-gray-400" />
                        </div>
                        <input
                          type="number"
                          min="0"
                          value={newVariant.price.amount}
                          onChange={(e) => setNewVariant({ ...newVariant, price: { ...newVariant.price, amount: e.target.value } })}
                          placeholder="Base Price"
                          className="w-full bg-white border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all shadow-sm font-bold text-lg text-gray-900"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Right Col: Images */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm h-full flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <label className="block text-sm font-bold text-gray-900 flex items-center gap-2 uppercase tracking-wider">
                      <ImageIcon size={18} className="text-indigo-500" /> Image Upload
                    </label>
                    <span className="text-xs font-bold bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full">{newVariant.images.length}/7</span>
                  </div>

                  {newVariant.images.length > 0 && (
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {newVariant.images.map((img, index) => (
                        <div key={index} className="relative aspect-[4/5] bg-gray-100 rounded-xl overflow-hidden border border-gray-200 group">
                          <img src={img.previewUrl} alt="Preview" className="w-full h-full object-cover" />
                          <button
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-2 right-2 bg-white/90 p-2 rounded-lg text-red-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-white shadow-md hover:scale-110"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {newVariant.images.length < 7 && (
                    <div className="mt-auto">
                      <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-2xl cursor-pointer bg-gray-50 hover:bg-indigo-50 hover:border-indigo-400 transition-all group">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <div className="p-3 bg-white rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
                             <Plus size={24} className="text-indigo-500" />
                          </div>
                          <p className="text-sm text-gray-600 font-bold">Click to upload images</p>
                          <p className="text-xs text-gray-400 mt-2 font-medium">PNG, JPG up to 10MB</p>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-10 flex justify-end pt-6 border-t border-gray-200">
                <button
                  onClick={handleAddNewVariant}
                  disabled={isSavingVariant}
                  className="bg-indigo-600 text-white px-10 py-3.5 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center gap-2 text-lg"
                >
                  {isSavingVariant ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={20} /> Save Variant
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Variants List */}
          {localVariants.length === 0 ? (
            <div className="py-20 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center">
              <div className="p-4 bg-white rounded-full shadow-sm mb-5">
                <Package size={48} className="text-gray-300" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">No Variants Yet</h4>
              <p className="text-gray-500 max-w-md font-medium">This product doesn't have any variations like size or color configured. Add a variant to start selling.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {localVariants.map((variant, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col">
                  <div className="p-6 flex gap-5">
                    {/* Variant Thumb */}
                    <div className="w-24 h-28 bg-gray-50 rounded-xl overflow-hidden shrink-0 border border-gray-200 relative">
                      {variant.images && variant.images.length > 0 ? (
                        <img src={variant.images[0].url} alt="Variant" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                           <ImageIcon size={24} className="mb-2 opacity-40" />
                           <span className="text-[10px] uppercase font-bold tracking-widest">N/A</span>
                        </div>
                      )}
                    </div>
                    {/* Attributes */}
                    <div className="flex-1 min-w-0 flex flex-col">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {Object.entries(variant.attributes || {}).map(([key, val]) => (
                          <span key={key} className="bg-gray-100 text-gray-800 px-2.5 py-1 rounded-lg text-xs font-bold tracking-wide flex items-center gap-1.5 border border-gray-200 shadow-sm">
                            <span className="text-gray-400 font-medium uppercase tracking-widest text-[10px]">{key}</span> {val}
                          </span>
                        ))}
                      </div>
                      <div className="text-lg font-black text-gray-900 mt-auto">
                        {variant.price?.amount ? `${variant.price.currency === 'INR' ? '₹' : variant.price.currency}${variant.price.amount}` : <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Base Price</span>}
                      </div>
                    </div>
                  </div>

                  {/* Stock Management Row */}
                  <div className="bg-gray-50/80 border-t border-gray-100 px-6 py-4 flex items-center justify-between mt-auto">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Current Stock</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        value={variant.stock || 0}
                        onChange={(e) => handleStockChange(idx, e.target.value)}
                        className="w-24 bg-white border border-gray-300 rounded-lg py-2 px-3 text-right focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none font-bold text-gray-900 shadow-sm text-lg"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default SellerProductDetails;