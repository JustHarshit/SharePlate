import { useEffect, useState } from 'react';
import { Geolocation } from '@capacitor/geolocation';
import { Capacitor } from '@capacitor/core';
import LoadingDialog from '../LoadingDialog/LoadingDialog';
import MatchFoundDialog from '../MatchFoundDialog/MatchFoundDialog';
import MatchNotFound from '../MatchNotFound/MatchNotFound';
import './DonationRequestForm.css';

function DonationRequestForm() {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    place: '',
    phone: '',
    email: '',
    amount: '',
    description: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [matchNotFound, setMatchNotFound] = useState(false);
  const [isMatchFound, setIsMatchFound] = useState(false);
  const [matchedOrg, setMatchedOrg] = useState(null);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      if (Capacitor.isNativePlatform()) {
        const permission = await Geolocation.checkPermissions();
        if (permission.location !== 'granted') {
          const request = await Geolocation.requestPermissions();
          if (request.location !== 'granted') {
            setError('Location permission denied');
            return;
          }
        }

        const position = await Geolocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        });

        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err) => {
          console.error('Error getting location:', err);
          setError('Unable to get your location. Please allow browser location access.');
        }
      );
    } catch (err) {
      console.error('Error getting location:', err);
      setError('Unable to get your location.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/match/donation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, location }),
      });

      const data = await response.json();

      if (response.ok && data.matchedOrg) {
        setMatchedOrg(data.matchedOrg);
        setIsMatchFound(true);
        setMatchNotFound(false);
      } else {
        setMatchedOrg(null);
        setMatchNotFound(true);
        setIsMatchFound(false);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to submit donation request.');
      setMatchNotFound(true);
      setIsMatchFound(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="donation-request-section">
      {isLoading && <LoadingDialog />}
      {isMatchFound && matchedOrg && (
        <MatchFoundDialog
          donorName={formData.name}
          receiverName={matchedOrg.name}
          onClose={() => setIsMatchFound(false)}
          onTrack={() => alert('Tracking started!')}
        />
      )}

      {matchNotFound && (
        <div className="overlay">
          <MatchNotFound onClose={() => setMatchNotFound(false)} />
        </div>
      )}

      <form className="donation-request-form" onSubmit={handleSubmit}>
        <h2>Request Donation</h2>
        {error && <p className="error">{error}</p>}

        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>

        <label>
          Place:
          <input type="text" name="place" value={formData.place} onChange={handleChange} required />
        </label>

        <label>
          Phone Number:
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        </label>

        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>

        <label>
          Amount:
          <input type="number" name="amount" value={formData.amount} onChange={handleChange} required />
        </label>

        <label>
          Description of Food:
          <textarea name="description" rows="4" value={formData.description} onChange={handleChange} required />
        </label>

        {location.lat && location.lng ? (
          <>
            <p>Your current location: Latitude: {location.lat}, Longitude: {location.lng}</p>
            <div className="map-preview-section">
              <iframe
                width="100%"
                height="300"
                frameBorder="0"
                src={`https://www.google.com/maps?q=${location.lat},${location.lng}&z=15&output=embed`}
                allowFullScreen
                title="Requester Location Map"
              />
            </div>
          </>
        ) : (
          <p>Fetching location...</p>
        )}

        <button type="submit">Find Match</button>
      </form>
    </div>
  );
}

export default DonationRequestForm;